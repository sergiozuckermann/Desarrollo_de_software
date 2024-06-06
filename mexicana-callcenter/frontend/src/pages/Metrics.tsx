// This code is a React component that displays the main content of the historical metrics page. 
// It uses the FetchMetrics function to fetch the metrics data and displays it in various charts and cards. 
//The component also includes a Filter component to allow users to filter the metrics data by agent, start time, and end time.
//The component uses the useState hook to manage the filter state and the handleApplyFilters function to update the filter state when the user applies new filters.
// The component also includes tooltips to provide additional information about each metric.


import React, { useState } from 'react';
import PageStructure from '../components/PageStructure';
import { FetchMetrics } from '../services/metrics';
import '../css/global.css';
import MyBarChart2 from '../components/Charts/barChart2';
import GaugeChart from 'react-gauge-chart';
import Filter from '../components/filters';
import MyBarChart from '../components/Charts/BarChartV';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import MyPieChart from '../components/Charts/piechart';

const MainContent = () => {
    // State to manage the filter values
    const [filters, setFilters] = useState({
        agent: '',
        startTime: '',
        endTime: ''
    });

    // Function to handle applying new filters
    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
    };

    // Fetch metrics data using the filters
    const { averageAbandonmentRate, averageAbandonTime, averageQueueAnswerTime, averageAnswerTime, ServiceLevel, averageContactDuration, contactsHandeled, contactFlowTime, agentOccupancy } = FetchMetrics(filters);
    // A console.log to check the data
    console.log(averageAbandonmentRate, averageAbandonTime, averageQueueAnswerTime, averageAnswerTime, averageContactDuration, contactsHandeled, contactFlowTime, agentOccupancy);

    // Display a loading message while fetching data
    if (averageAbandonTime === null || averageQueueAnswerTime === null) {
        return <div>Loading...</div>;
    }

    // Data for the charts
    const ServiceData = [{ metric: "Service Level", percentage: ServiceLevel }];

    const AbandonData = [
        ...averageAbandonTime.map(item => ({ metric: item.label, value: item.value })),
    ];

    const AnswerData = [
        ...averageQueueAnswerTime.map(item => ({ metric: item.label, value: item.value })),
    ];

    const OccupancyData = agentOccupancy !== null ? [
        { metric: "Occupied", value: agentOccupancy },
        { metric: "Unoccupied", value: 100 - agentOccupancy }
    ] : [];

    // Function to format time in hours, minutes, and seconds
    const formatTime = (seconds) => {
        if (seconds >= 3600) {
            const hours = Math.floor(seconds / 3600);
            const remainingMinutes = Math.floor((seconds % 3600) / 60);
            const remainingSeconds = seconds % 60;
            return `${hours}:${remainingMinutes}:${remainingSeconds} hours`;
        } else if (seconds >= 60) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes}:${remainingSeconds} minutes`;
        } else {
            return `${seconds} seconds`;
        }
    };

    return (
        <div className="grid w-full h-full grid-cols-12 grid-rows-6 gap-4 p-2 pt-5 overflow-y-auto" >
            {/* Abandonment Rate */}
            <div className="col-span-3 row-span-2 card bg-tertiary dark:bg-primary"
                data-tooltip-id="tooltipAbandonmentRate"
                data-tooltip-content="Abandonment Rate is the percentage of calls that are abandoned by the caller before being answered by an agent. High abandonment rates can be a sign of poor customer service or long wait times. A low abandonment rate is a good indicator of customer satisfaction and efficient call handling by agents"
                data-tooltip-place="right">
                <p className='dark:text-white'>Abandonment Rate</p>
                <GaugeChart id="gauge-chart1" nrOfLevels={20} colors={["#84BF68", "#FF5F6D", "#FFC371"]} arcWidth={0.3} percent={averageAbandonmentRate / 100} textColor="#20253F" />
            </div>
            <Tooltip id="tooltipAbandonmentRate" className="custom-tooltip" />

            {/* Agent Occupancy */}
            <div className="col-span-3 row-span-2 shadow-lg card bg-tertiary dark:bg-primary"
            data-tooltip-id="my-tooltipAgentOccupancy" 
            data-tooltip-content="Agent Occupancy is the percentage of time agents are actively engaged in customer interactions in relation to their available or idle time. As a statistic, it's used to calculate call center productivity." 
            data-tooltip-place="right">
                <div className="flex flex-row items-center justify-between">
                    <div className="px-4 py-4 bg-gray-300 rounded-xl bg-opacity-30">
                    </div>
                    <div className="inline-flex text-sm text-gray-600 sm:text-base dark:text-white">
                        12%
                    </div>
                </div>
                <h1 className="mt-1 text-3xl font-bold text-gray-700 sm:text-m xl:text-4xl"></h1>
                <div className="flex flex-row justify-between mt-2">
                    <p className='dark:text-white'>Agent Occupancy </p>
                    {/* {agentOccupancy !== null && (
                    <div className="w-full h-full">
                        <MyPieChart data={OccupancyData} unit="%" />
                    </div>
                )} */}
                </div>
                <h1 className="mt-1 text-3xl font-bold text-gray-700 sm:text-m xl:text-4xl dark:text-white">No Available Data</h1>    
            </div>
            <Tooltip id="my-tooltipAgentOccupancy" className="custom-tooltip"  />
            
            {/* Average Queue Answer Time (ASA) */}
            <div className="col-span-3 row-span-2 shadow-lg card bg-tertiary dark:bg-primary"
            data-tooltip-id="tooltipAverageQueueAnswerTime"
            data-tooltip-content=" ASA is a more generalized metric that measures the average time it takes for all calls to be answered across the entire call center, regardless of the queue they are in. It provides an overall picture of the call center's efficiency in handling incoming calls. A low ASA indicates that calls are being answered quickly, while a high ASA indicates that callers are waiting a long time to speak with an agent."
            data-tooltip-place="right">
                <div className="flex flex-row items-center justify-between">
                    <div className="px-4 py-4 bg-gray-300 rounded-xl bg-opacity-30">
                    </div>
                    <div className="inline-flex text-sm text-gray-600 sm:text-base dark:text-white">
                        12%
                    </div>
                </div>
                <h1 className="mt-1 text-3xl font-bold text-gray-700 sm:text-m xl:text-4xl dark:text-white">{formatTime(averageAnswerTime)}</h1>
                <div className="flex flex-row justify-between mt-2">
                    <p className='dark:text-white'>Average Queue Answer Time (ASA)</p>
                </div>
            </div>
            <Tooltip id="tooltipAverageQueueAnswerTime" className="custom-tooltip" />

            {/* FILTER */}
            <div className="relative w-full h-full col-span-3 row-span-1 p-2 border-gray-400 "
            data-tooltip-id="tooltipFilter"
            data-tooltip-content=" Filter by agent, date, queue."
            data-tooltip-place="bottom">
                <Filter onApplyFilters={handleApplyFilters} />
            </div>
            <Tooltip id="tooltipFilter" className="custom-tooltip" />

            {/* Average Answer Time per Queue */}
            <div className="col-span-3 col-start-10 row-span-3 card bg-tertiary dark:bg-primary"
            data-tooltip-id="tooltipAverageAnswerTimePerQueue"
            data-tooltip-content="This metric measures the average amount of time it takes for calls to be answered in a specific queue. A low average answer time indicates that calls are being answered quickly, while a high average answer time indicates that callers are waiting a long time to speak with an agent."
            data-tooltip-place="bottom">
                <p className='dark:text-white'>Average Answer Time per Queue</p>
                <MyBarChart2 data={AnswerData} />
            </div>
            <Tooltip id="tooltipAverageAnswerTimePerQueue" className="custom-tooltip" />

            {/* Average Queue Abandon Time */}
            <div className="col-span-5 row-span-2 card bg-tertiary dark:bg-primary"
            data-tooltip-id="tooltipAverageQueueAbandonTime"
            data-tooltip-content="This metric measures the average amount of time callers wait in a queue before abandoning the call. A high average queue abandon time indicates that callers are waiting a long time before abandoning the call."
            data-tooltip-place="right">
                <p className='dark:text-white'>Average Queue Abandon Time</p>
                <MyBarChart2 data={AbandonData} />
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
                        12%
                    </div>
                </div>
                <h1 className="mt-1 text-3xl font-bold text-gray-700 sm:text-m xl:text-4xl dark:text-white">{formatTime(averageContactDuration)}</h1>
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
                        12%
                    </div>
                </div>
                <h1 className="mt-1 text-3xl font-bold text-gray-700 sm:text-m xl:text-4xl dark:text-white">{contactsHandeled} contacts</h1>
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
                        12%
                    </div>
                </div>
                <h1 className="mt-1 text-3xl font-bold text-gray-700 sm:text-m xl:text-4xl dark:text-white">{formatTime(contactFlowTime)}</h1>
            </div>
            <Tooltip id="tooltipContactFlowTime" className="custom-tooltip" />
        </div>
    );
};

// Metrics page component that displays the main content in a page structure
const Metrics = () => {
    return (
        <PageStructure title="Metrics">
            <MainContent />
        </PageStructure>
    );
};

export default Metrics;
