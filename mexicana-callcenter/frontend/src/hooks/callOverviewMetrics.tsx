import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from "./useAuth";
import { useWebSocket } from './useWebSocket';
import { callOverviewAnalytics } from '../utils/interfaces';

interface CallOverviewMetricsContextType {
    globalMetrics: callOverviewAnalytics | null;
}

interface CallOverviewMetricsProviderProps {
    children: React.ReactNode;
}

const MetricsCallOverviewContext = createContext<CallOverviewMetricsContextType | undefined>(undefined);

export const MetricsCallOverview: React.FC<CallOverviewMetricsProviderProps> = ({ children }) => {
    const { socket } = useWebSocket();
    const { isAuthenticated, role } = useAuth();
    const [globalMetrics, setglobalMetrics] = useState<callOverviewAnalytics | null>(null);

    useEffect(() => {
        if (socket && role === 'Supervisor' && isAuthenticated) {
            socket.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    updateMetrics(data);
                } catch (error) {
                    console.error('Error parsing message from websocket:', error);
                }
            }
        }
    }, [socket, role, isAuthenticated]);

    // calculate metrics for call overview
    const updateMetrics = (segment: any) => {
        console.log("Metrics:", segment);
        console.log('Updating metrics with segment:', segment);

        // format values for sentiment trend chart
        const sentimentValue = segment.Sentiment === "POSITIVE" ? 3 : segment.Sentiment === "NEGATIVE" ? -3 : 0;
        const timeStamp = parseFloat((segment.BeginOffsetMillis / 1000).toFixed(2));

        const updatedMetrics: callOverviewAnalytics = {
            agentTalk: globalMetrics?.agentTalk || 0,
            customerTalk: globalMetrics?.customerTalk || 0,
            nonTalk: globalMetrics?.nonTalk || 0,
            sentimentTrend: [...(globalMetrics?.sentimentTrend || []), { x: timeStamp, y: sentimentValue }],
            sentimentPercentages: {
                POSITIVE: globalMetrics?.sentimentPercentages.POSITIVE || 0,
                NEGATIVE: globalMetrics?.sentimentPercentages.NEGATIVE || 0,
                NEUTRAL: globalMetrics?.sentimentPercentages.NEUTRAL || 0,
            },
            callDuration: globalMetrics?.callDuration || 0,
        };

        // increment count for every interaction type (for sentiment pie chart)
        const sentimentKey = segment.Sentiment as 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
        updatedMetrics.sentimentPercentages[sentimentKey] += 1;

        // increment intervention times by participant (for agent talk, customer talk, non talk)
        if (segment.ParticipantRole === "AGENT") {
            updatedMetrics.agentTalk += parseFloat(((segment.EndOffsetMillis - segment.BeginOffsetMillis) / 1000).toFixed(2));
        } else if (segment.ParticipantRole === "CUSTOMER") {
            updatedMetrics.customerTalk += parseFloat(((segment.EndOffsetMillis - segment.BeginOffsetMillis) / 1000).toFixed(2));
        } else {
            updatedMetrics.nonTalk += parseFloat(((segment.EndOffsetMillis - segment.BeginOffsetMillis) / 1000).toFixed(2));
        }

        // calculate call duration
        updatedMetrics.callDuration += parseFloat(((segment.EndOffsetMillis - segment.BeginOffsetMillis) / 1000).toFixed(2));
        
        console.log('Updated global metrics:', updatedMetrics);
        setglobalMetrics(updatedMetrics);
    };

    return (
        <MetricsCallOverviewContext.Provider value={{ globalMetrics }}>
            {children}
        </MetricsCallOverviewContext.Provider>
    );
};

export const useCallOverViewMetrics = () => {
    const context = useContext(MetricsCallOverviewContext);
    if (!context) {
        throw new Error('useCallOverViewMetrics must be used within a MetricsCallOverviewProvider');
    }
    return context;
};
