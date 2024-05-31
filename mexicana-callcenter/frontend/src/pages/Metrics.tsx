import React, { useState } from 'react';
import PageStructure from '../components/PageStructure';
import { FetchMetrics } from '../services/metrics';
import '../css/global.css';
import MyBarChart2 from '../components/Charts/barChart2';
import GaugeChart from 'react-gauge-chart';
import Filter from '../components/filters';
import MyBarChart from '../components/Charts/BarChartV';
import MyPieChart from '../components/Charts/piechart'; // Assuming MyPieChart is a pie chart component

const MainContent = () => {
    const [filters, setFilters] = useState({
        agent: '',
        startTime: '',
        endTime: ''
    });

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
    };

    const { averageAbandonmentRate, averageAbandonTime, averageQueueAnswerTime, averageAnswerTime, ServiceLevel, averageContactDuration, contactsHandeled, contactFlowTime, agentOccupancy } = FetchMetrics(filters);
    console.log(averageAbandonmentRate, averageAbandonTime, averageQueueAnswerTime, averageAnswerTime, averageContactDuration, contactsHandeled, contactFlowTime, agentOccupancy);

    if (averageAbandonTime === null || averageQueueAnswerTime === null) {
        return <div>Loading...</div>;
    }

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
        <div className="grid w-full h-full grid-cols-12 grid-rows-6 gap-4 p-2 pt-5 overflow-y-auto">
            <div className="col-span-3 row-span-2 card bg-tertiary">
                <p>Abandonment Rate</p>
                <GaugeChart id="gauge-chart1" nrOfLevels={20} colors={["#84BF68", "#FF5F6D", "#FFC371"]} arcWidth={0.3} percent={averageAbandonmentRate / 100} textColor="#20253F" />
            </div>
            <div className="col-span-3 row-span-2 shadow-lg card bg-tertiary">
                <div className="flex flex-row items-center justify-between">
                    <div className="px-4 py-4 bg-gray-300 rounded-xl bg-opacity-30">
                    </div>
                    <div className="inline-flex text-sm text-gray-600 sm:text-base">
                        12%
                    </div>
                </div>
                <h1 className="mt-1 text-3xl font-bold text-gray-700 sm:text-m xl:text-4xl"></h1>
                <div className="flex flex-row justify-between mt-2">
                    <p>Agent Occupancy </p>
                    {/* {agentOccupancy !== null && (
                    <div className="w-full h-full">
                        <MyPieChart data={OccupancyData} unit="%" />
                    </div>
                )} */}
                </div>
                <h1 className="mt-1 text-3xl font-bold text-gray-700 sm:text-m xl:text-4xl">No Available Data</h1>
            </div>
            <div className="col-span-3 row-span-2 shadow-lg card bg-tertiary">
                <div className="flex flex-row items-center justify-between">
                    <div className="px-4 py-4 bg-gray-300 rounded-xl bg-opacity-30">
                    </div>
                    <div className="inline-flex text-sm text-gray-600 sm:text-base">
                        12%
                    </div>
                </div>
                <h1 className="mt-1 text-3xl font-bold text-gray-700 sm:text-m xl:text-4xl">{formatTime(averageAnswerTime)}</h1>
                <div className="flex flex-row justify-between mt-2">
                    <p>Average Queue Answer Time (ASA)</p>
                </div>
            </div>
            <div className="relative w-full h-full col-span-3 row-span-1 p-2 border-gray-400">
                <Filter onApplyFilters={handleApplyFilters} />
            </div>
            <div className="col-span-3 col-start-10 row-span-3 card bg-tertiary">
                <p>Average Answer Time per Queue</p>
                <MyBarChart2 data={AnswerData} />
            </div>
            <div className="col-span-5 row-span-2 card bg-tertiary">
                <p>Average Queue Abandon Time</p>
                <MyBarChart2 data={AbandonData} />
            </div>
            <div className="col-span-4 row-span-2 card bg-tertiary">
                <p>Service Level</p>
                <MyBarChart data={ServiceData} />
            </div>
            <div className="col-span-4 row-span-2 card bg-tertiary">
                <div className="flex flex-row justify-between pb-5 mt-2">
                    <p>Average Contact Duration</p>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <div className="px-4 py-4 bg-gray-300 rounded-xl bg-opacity-30">
                    </div>
                    <div className="inline-flex text-sm text-gray-600 sm:text-base">
                        12%
                    </div>
                </div>
                <h1 className="mt-1 text-3xl font-bold text-gray-700 sm:text-m xl:text-4xl">{formatTime(averageContactDuration)}</h1>
            </div>
            <div className="col-span-4 row-span-2 card bg-tertiary">
                <div className="flex flex-row justify-between pb-5 mt-2">
                    <p>Contacts Handled</p>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <div className="px-4 py-4 bg-gray-300 rounded-xl bg-opacity-30">
                    </div>
                    <div className="inline-flex text-sm text-gray-600 sm:text-base">
                        12%
                    </div>
                </div>
                <h1 className="mt-1 text-3xl font-bold text-gray-700 sm:text-m xl:text-4xl">{contactsHandeled} contacts</h1>
            </div>
            <div className="col-span-4 row-span-2 card bg-tertiary">
                <div className="flex flex-row justify-between pb-5 mt-2">
                    <p>Contact Flow Time</p>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <div className="px-4 py-4 bg-gray-300 rounded-xl bg-opacity-30">
                    </div>
                    <div className="inline-flex text-sm text-gray-600 sm:text-base">
                        12%
                    </div>
                </div>
                <h1 className="mt-1 text-3xl font-bold text-gray-700 sm:text-m xl:text-4xl">{formatTime(contactFlowTime)}</h1>
            </div>
        </div>
    );
};

const Metrics = () => {
    return (
        <PageStructure title="Metrics">
            <MainContent />
        </PageStructure>
    );
};

export default Metrics;
