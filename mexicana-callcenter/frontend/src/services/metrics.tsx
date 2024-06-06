import { useState, useEffect } from 'react';
import axios from 'axios';

const queueNames = {
    '99bfbe85-27ac-4384-8462-f01f75b53d32': "Flight Management",
    '292d0398-6089-42cc-9ec9-aee43d6202a6': "Travel logistics"
};

export function FetchMetrics(filters) {
    const [averageAbandonmentRate, setAverageAbandonmentRate] = useState<number | null>(null);
    const [averageAbandonTime, setAverageAbandonTime] = useState<Array<{ label: string, value: number }> | null>(null);
    const [averageQueueAnswerTime, setAverageQueueAnswerTime] = useState<Array<{ label: string, value: number }> | null>(null);
    const [averageAnswerTime, setAverageAnswerTime] = useState<number | null>(null);
    const [ServiceLevel, setServiceLevel] = useState<number | null>(null);
    const [averageContactDuration, setAverageContactDuration] = useState<number | null>(null);
    const [contactsHandeled, setContactsHandeled] = useState<number | null>(null);
    const [contactFlowTime, setContactFlowTime] = useState<number | null>(null);
    const [agentOccupancy, setAgentOccupancy] = useState<Array<{ label: string, value: number }> | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const requestFilters = filters || {};
                console.log("Filters before sending request:", requestFilters);
                const response = await axios.post("http://localhost:3000/historicmetrics", requestFilters, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                const queueMetrics = response.data.QueueMetrics.MetricResults;
                const agentMetrics = response.data.AgentMetrics.MetricResults;

                let totalAbandonmentRate = 0;
                let abandonmentRateCount = 0;
                let abandonTimes = [];
                let queueAnswerTimes = [];
                let totalAnswerTime = 0;
                let AnswerTimeCount = 0;
                let serviceLevelValue = null;
                let totalContactDuration = 0;
                let contactDurationCount = 0;
                let contactsHandeled = 0;
                let contactFlowTime = 0;
                let contactFlowTimeCount = 0;
                let agentOccupancyArray = [];

                queueMetrics.forEach((queue) => {
                    if (queue.Dimensions && queue.Dimensions.QUEUE) {
                        const queueName = queueNames[queue.Dimensions.QUEUE];
                        queue.Collections.forEach((metric) => {
                            switch (metric.Metric.Name) {
                                case "ABANDONMENT_RATE":
                                    if (metric.Value !== undefined) {
                                        totalAbandonmentRate += metric.Value;
                                        abandonmentRateCount++;
                                    }
                                    break;
                                case "AVG_ABANDON_TIME":
                                    if (metric.Value !== undefined) {
                                        abandonTimes.push({ label: queueName, value: metric.Value });
                                    }
                                    break;
                                case "AVG_QUEUE_ANSWER_TIME":
                                    if (metric.Value !== undefined) {
                                        queueAnswerTimes.push({ label: queueName, value: Math.round(metric.Value) });
                                        totalAnswerTime += metric.Value;
                                        AnswerTimeCount++;
                                    }
                                    break;
                                case "SERVICE_LEVEL":
                                    if (metric.Value !== undefined) {
                                        serviceLevelValue = Math.round(metric.Value);
                                    }
                                    break;
                                case "AVG_CONTACT_DURATION":
                                    if (metric.Value !== undefined) {
                                        totalContactDuration += metric.Value;
                                        contactDurationCount++;
                                    }
                                    break;
                                case "CONTACTS_HANDLED":
                                    if (metric.Value !== undefined) {
                                        contactsHandeled = metric.Value;
                                    }
                                    break;
                                case "SUM_CONTACT_FLOW_TIME":
                                    if (metric.Value !== undefined) {
                                        contactFlowTime += metric.Value;
                                        contactFlowTimeCount++;
                                    }
                                    break;
                            }
                        });
                    }
                });

                if (abandonmentRateCount > 0) {
                    setAverageAbandonmentRate(Math.round(totalAbandonmentRate / abandonmentRateCount));
                }
                setAverageAbandonTime(abandonTimes);
                setAverageQueueAnswerTime(queueAnswerTimes.map(item => ({ ...item, value: Math.round(item.value) })));

                if (AnswerTimeCount > 0) {
                    setAverageAnswerTime(Math.round(totalAnswerTime / AnswerTimeCount));
                }
                setServiceLevel(serviceLevelValue);

                if (contactDurationCount > 0) {
                    setAverageContactDuration(Math.round(totalContactDuration / contactDurationCount));
                }
                setContactsHandeled(contactsHandeled);
                if (contactFlowTimeCount > 0) {
                    setContactFlowTime(Math.round(contactFlowTime / contactFlowTimeCount));
                }

                agentMetrics.forEach((agent) => {
                    agent.Collections.forEach((metric) => {
                        if (metric.Metric.Name === "AGENT_OCCUPANCY" && metric.Value !== undefined) {
                            agentOccupancyArray.push({ label: agent.Dimensions.AGENT, value: metric.Value });
                        }
                    });
                });

                setAgentOccupancy(agentOccupancyArray);

            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, [filters]);

    return {
        averageAbandonmentRate,
        averageAbandonTime,
        averageQueueAnswerTime,
        averageAnswerTime,
        ServiceLevel,
        averageContactDuration,
        contactsHandeled,
        contactFlowTime,
        agentOccupancy
    };
}
