import React, { useState, useEffect } from 'react';
import PageStructure from '../components/PageStructure';
import { FetchMetrics } from '../services/metrics';
import '../css/global.css';
import MyBarChart2 from '../components/Charts/barChart2';
import MyBarChart from '../components/Charts/BarChartV';
import GaugeChart from 'react-gauge-chart';
import Filter from '../components/filters';
import MyPieChart from '../components/Charts/piechart';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import Modal from 'react-modal';
import { useAuth } from '../hooks/useAuth';

Modal.setAppElement('#root');

// Define the metrics that can be displayed
type Metric = "Flight Management" | "Travel Information" | "Special Assistance" | "Website Assistance" | "Other Questions" | "Customer Service";

// Define the data point interface
interface DataPoint {
  metric: Metric;
  value: number;
}

// Main content component that displays the metrics
const MainContent: React.FC = () => {
    //define the state variables
    const { username: loggedInAgentId } = useAuth();
    const [filters, setFilters] = useState<Record<string, string>>({
        agentId: loggedInAgentId || '', // Default to the logged-in agent's username
        startTime: '',
        endTime: '',
        queue: '',
    });

    const [isApplyingFilters, setIsApplyingFilters] = useState(false);

    const {
        averageAbandonmentRate,
        averageAbandonTime,
        averageQueueAnswerTime,
        averageAnswerTime,
        ServiceLevel,
        averageContactDuration,
        contactsHandeled,
        contactFlowTime,
        agentOccupancy,
        agentsList
    } = FetchMetrics(filters);

    //useEffect to check if the filters are being applied
    useEffect(() => {
        if (isApplyingFilters) {
            setIsApplyingFilters(false);
        }
    }, [averageAbandonTime, averageQueueAnswerTime]);

    //function to apply filters
    const handleApplyFilters = (newFilters: Record<string, string>) => {
        setIsApplyingFilters(true);
        setFilters({ ...newFilters, agentId: loggedInAgentId || '' }); // Ensure agentId is the logged-in agent's username
    };

    //check if the data is still loading
    if (averageAbandonTime === null || averageQueueAnswerTime === null) {
        return <div>Loading...</div>;
    }

    //define the data points for the metrics
    const ServiceData = [{ metric: "Customer Service", percentage: ServiceLevel !== null ? ServiceLevel : 0 }];

    const AbandonData: DataPoint[] = averageAbandonTime !== null && averageAbandonTime.length > 0
        ? averageAbandonTime.map(item => ({ metric: item.label as Metric, value: item.value }))
        : [{ metric: "Other Questions", value: 0 }];

    const AnswerData: DataPoint[] = averageQueueAnswerTime !== null && averageQueueAnswerTime.length > 0
        ? averageQueueAnswerTime.map(item => ({ metric: item.label as Metric, value: item.value }))
        : [{ metric: "Other Questions", value: 0 }];

    const totalOccupancy = agentOccupancy && agentOccupancy.length > 0
        ? agentOccupancy.reduce((acc, curr) => acc + curr.value, 0)
        : 0;

    const formattedOccupancyData = [
        { id: 'Occupied', label: 'Occupied', value: totalOccupancy, color: '#84BF68' },
        { id: 'Unoccupied', label: 'Unoccupied', value: 100 - totalOccupancy, color: 'red' }
    ];

    // Function to format time in seconds to a human-readable format
    const formatTime = (seconds: number): string => {
        if (seconds >= 3600) {
            const hours = Math.floor(seconds / 3600);
            const remainingMinutes = Math.floor((seconds % 3600) / 60);
            const remainingSeconds = seconds % 60;
            return `${hours}:${remainingMinutes < 10 ? '0' : ''}${remainingMinutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds} hours`;
        } else if (seconds >= 60) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds} minutes`;
        } else {
            return `${seconds} seconds`;
        }
    };

    return (
        <div className="grid w-full h-full grid-cols-12 grid-rows-6 gap-4 p-2 pt-5 overflow-y-auto">
            {/* filters */}
            <Modal
                isOpen={isApplyingFilters}
                onRequestClose={() => setIsApplyingFilters(false)}
                contentLabel="Applying Filters"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <div className="p-4 bg-white rounded-lg shadow-lg">
                    <h2 className="text-lg font-bold font-roboto text-secondary">Applying Filters</h2>
                    <p className=" font-roboto">Please wait while we apply your filters...</p>
                </div>
            </Modal>

            {/* Abandonment Rate */}
            <div className="col-span-3 row-span-2 card bg-tertiary dark:bg-primary"
                data-tooltip-id="tooltipAbandonmentRate"
                data-tooltip-content="Abandonment Rate is the percentage of calls that are abandoned by the caller before being answered by an agent. High abandonment rates can be a sign of poor customer service or long wait times. A low abandonment rate is a good indicator of customer satisfaction and efficient call handling by agents"
                data-tooltip-place="right">
                <p className='dark:text-white'>Abandonment Rate</p>
                {averageAbandonmentRate !== null ? (
                    <GaugeChart id="gauge-chart1" nrOfLevels={20} colors={["#84BF68", "#FF5F6D", "#FFC371"]} arcWidth={0.3} percent={averageAbandonmentRate / 100} textColor="#20253F" />
                ) : (
                    <p className='dark:text-white'>No Data</p>
                )}
            </div>
            <Tooltip id="tooltipAbandonmentRate" className="custom-tooltip" />

            {/* Agent Occupancy */}
            <div className="col-span-3 row-span-2 card bg-tertiary dark:bg-primary"
                data-tooltip-id="my-tooltipAgentOccupancy"
                data-tooltip-content="Agent Occupancy is the percentage of time agents are actively engaged in customer interactions in relation to their available or idle time. As a statistic, it's used to calculate call center productivity."
                data-tooltip-place="right">
                <p className='dark:text-white'>Agent Occupancy</p>
                <MyPieChart data={formattedOccupancyData} unit="%" />
            </div>
            <Tooltip id="my-tooltipAgentOccupancy" className="custom-tooltip" />

            {/* Average Queue Answer Time (ASA) */}
            <div className="col-span-3 row-span-2 shadow-lg card bg-tertiary dark:bg-primary"
                data-tooltip-id="tooltipAverageQueueAnswerTime"
                data-tooltip-content="ASA is a more generalized metric that measures the average time it takes for all calls to be answered across the entire call center, regardless of the queue they are in. It provides an overall picture of the call center's efficiency in handling incoming calls. A low ASA indicates that calls are being answered quickly, while a high ASA indicates that callers are waiting a long time to speak with an agent."
                data-tooltip-place="right">
                <div className="flex flex-row items-center justify-between">
                    <div className="px-4 py-4 bg-gray-300 rounded-xl bg-opacity-30">
                    </div>
                    <div className="inline-flex text-sm text-gray-600 sm:text-base dark:text-white">
                    </div>
                </div>
                <h1 className="mt-1 text-3xl font-bold text-gray-700 sm:text-m xl:text-4xl dark:text-white">{formatTime(averageAnswerTime || 0)}</h1>
                <div className="flex flex-row justify-between mt-2">
                    <p className='dark:text-white'>Average Queue Answer Time (ASA)</p>
                </div>
            </div>
            <Tooltip id="tooltipAverageQueueAnswerTime" className="custom-tooltip" />

            {/* FILTER */}
            <div className="relative w-full h-full col-span-3 row-span-1 p-2 border-gray-400">
                <Filter onApplyFilters={handleApplyFilters} agentsList={agentsList} isAgentFilterEditable={false} />
            </div>

            {/* Average Answer Time per Queue */}
            <div className="col-span-3 col-start-10 row-span-3 card bg-tertiary dark:bg-primary"
                data-tooltip-id="tooltipAverageAnswerTimePerQueue"
                data-tooltip-content="This metric measures the average amount of time it takes for calls to be answered in a specific queue. A low average answer time indicates that calls are being answered quickly, while a high average answer time indicates that callers are waiting a long time to speak with an agent."
                data-tooltip-place="bottom">
                <p className='dark:text-white'>Average Answer Time per Queue</p>
                <MyBarChart2 data={AnswerData} unit="secs" />
            </div>
            <Tooltip id="tooltipAverageAnswerTimePerQueue" className="custom-tooltip" />

            {/* Average Queue Abandon Time */}
            <div className="col-span-5 row-span-2 card bg-tertiary dark:bg-primary"
                data-tooltip-id="tooltipAverageQueueAbandonTime"
                data-tooltip-content="This metric measures the average amount of time callers wait in a queue before abandoning the call. A high average queue abandon time indicates that callers are waiting a long time before abandoning the call."
                data-tooltip-place="right">
                <p className='dark:text-white'>Average Queue Abandon Time</p>
                <MyBarChart2 data={AbandonData} unit="secs" />
            </div>
            <Tooltip id="tooltipAverageQueueAbandonTime" className="custom-tooltip" />

            {/* Service Level */}
            <div className="col-span-4 row-span-2 card bg-tertiary dark:bg-primary"
                data-tooltip-id="tooltipServiceLevel"
                data-tooltip-content="Service Level is the percentage of calls that are answered within a specified time threshold. Measures the efficiency of call handling by agents. A high service level indicates that calls are being answered quickly."
                data-tooltip-place="right">
                <p className='dark:text-white'>Service Level</p>
                <MyBarChart data={ServiceData} />
            </div>
            <Tooltip id="tooltipServiceLevel" className="custom-tooltip" />

            {/* Average Contact Duration */}
            <div className="col-span-4 row-span-2 card bg-tertiary dark:bg-primary"
                data-tooltip-id="tooltipAverageContactDuration"
                data-tooltip-content="Average Contact Duration measures the average amount of time agents spend on a call with a customer. A low average contact duration indicates that agents are resolving customer issues quickly, while a high average contact duration indicates that agents are spending a long time on calls."
                data-tooltip-place="right">
                <div className="flex flex-row justify-between pb-5 mt-2">
                    <p className='dark:text-white'>Average Contact Duration</p>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <div className="px-4 py-4 bg-gray-300 rounded-xl bg-opacity-30">
                    </div>
                    <div className="inline-flex text-sm text-gray-600 sm:text-base dark:text-white">
                    </div>
                </div>
                <h1 className="mt-1 text-3xl font-bold text-gray-700 sm:text-m xl:text-4xl dark:text-white">
                    {averageContactDuration !== null ? formatTime(averageContactDuration) : "0 seconds"}
                </h1>
            </div>
            <Tooltip id="tooltipAverageContactDuration" className="custom-tooltip" />

            {/* Contacts Handled */}
            <div className="col-span-4 row-span-2 card bg-tertiary dark:bg-primary"
                data-tooltip-id="tooltipContactsHandled"
                data-tooltip-content="Contacts Handled is the total number of contacts that agents have handled within a specified time period. This metric provides insight into the volume of calls that agents are handling and can help identify trends in call volume and agent performance."
                data-tooltip-place="right">
                <div className="flex flex-row justify-between pb-5 mt-2">
                    <p className='dark:text-white'>Contacts Handled</p>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <div className="px-4 py-4 bg-gray-300 rounded-xl bg-opacity-30">
                    </div>
                    <div className="inline-flex text-sm text-gray-600 sm:text-base dark:text-white">
                    </div>
                </div>
                <h1 className="mt-1 text-3xl font-bold text-gray-700 sm:text-m xl:text-4xl dark:text-white">{contactsHandeled || 0} contacts</h1>
            </div>
            <Tooltip id="tooltipContactsHandled" className="custom-tooltip" />

            {/* Contact Flow Time */}
            <div className="col-span-4 row-span-2 card bg-tertiary dark:bg-primary"
                data-tooltip-id="tooltipContactFlowTime"
                data-tooltip-content="Contact Flow Time measures the average amount of time it takes for a contact to move through the call center from the time it is received to the time it is resolved. A low contact flow time indicates that contacts are being resolved quickly, while a high contact flow time indicates that contacts are taking a long time to be resolved."
                data-tooltip-place="top">
                <div className="flex flex-row justify-between pb-5 mt-2">
                    <p className='dark:text-white'> Contact Flow Time </p>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <div className="px-4 py-4 bg-gray-300 rounded-xl bg-opacity-30">
                    </div>
                    <div className="inline-flex text-sm text-gray-600 sm:text-base dark:text-white">
                    </div>
                </div>
                <h1 className="mt-1 text-3xl font-bold text-gray-700 sm:text-m xl:text-4xl dark:text-white">{formatTime(contactFlowTime || 0)}</h1>
            </div>
            <Tooltip id="tooltipContactFlowTime" className="custom-tooltip" />
        </div>
    );
};

// Metrics page component that displays the main content in a page structure
const MetricsAgent: React.FC = () => {
    return (
        //return the page structure with the main content and name
        <PageStructure title="Metrics">
            <MainContent />
        </PageStructure>
    );
};

export default MetricsAgent;