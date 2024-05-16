import PageStructure from '../components/PageStructure';
import { FetchMetrics } from '../services/metrics';
import '../css/global.css';
import MyResponsiveBar from '../components/Charts/barChart2';
import GaugeChart from 'react-gauge-chart';
import Filter from '../components/filters';
import { useState } from 'react';

const MainContent = () => {
    const [filters, setFilters] = useState({
        name: '',
        manufacturer: '',
        date: new Date(),
        status: ''
    });

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
    };

    const { averageAbandonmentRate, averageAbandonTime, averageQueueAnswerTime, averageAnswerTime } = FetchMetrics();
    console.log(averageAbandonTime, averageQueueAnswerTime, averageAnswerTime);

    if (averageAbandonTime === null || averageQueueAnswerTime === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid w-full h-full grid-cols-12 grid-rows-6 gap-4 p-2 pt-5 overflow-y-auto">
            {/* Abandonment Rate */}
            <div className="col-span-3 row-span-2 card bg-tertiary">
                <p>Abandonment Rate</p>
                <GaugeChart id="gauge-chart1" nrOfLevels={20} colors={["#84BF68", "#FF5F6D", "#FFC371"]} arcWidth={0.3} percent={averageAbandonmentRate / 100} textColor="#20253F" />
            </div>

            {/* Average Case Resolution Time */}
            <div className="col-span-3 row-span-2 card bg-tertiary">
                <p>Average Case Resolution Time</p>
                {/* <MyResponsiveBar data={averageAbandonTime} />
                <p>{averageAbandonTime}</p> */}
            </div>

            {/* Average Contacts per Case */}
             {/* Average Queue Answer Time (ASA) */}
            <div className="col-span-3 row-span-2 shadow-lg card bg-tertiary ">
                {/* hover:bg-gradient-to-br hover:from-purple-400 hover:via-blue-400 hover:to-blue-500 rounded-xl hover:shadow-2xl group */}
                <div className="flex flex-row items-center justify-between">
                    <div className="px-4 py-4 bg-gray-300 rounded-xl bg-opacity-30">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 group-hover:text-gray-50" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="inline-flex text-sm text-gray-600 group-hover:text-gray-200 sm:text-base">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-green-500 group-hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        12%
                    </div>
                </div>
                <h1 className="mt-1 text-3xl font-bold text-gray-700 sm:text-m xl:text-4xl group-hover:text-gray-50">{averageAnswerTime} seconds</h1>
                <div className="flex flex-row justify-between mt-2 group-hover:text-gray-200">
                    <p>Average Queue Answer Time (ASA)</p>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-indigo-600 group-hover:text-gray-200" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                    </span>
                </div>
            </div>


            {/* Average Contacts per Case */}
            
            {/* Filters */}
            <div className="relative w-full h-full col-span-3 row-span-1 p-2 border-gray-400">
                <Filter onApplyFilters={handleApplyFilters} />
            </div>

            {/* Cases Resolved on the First Contact */}
            <div className="col-span-3 col-start-10 row-span-3 card bg-tertiary">
                <p>Cases Resolved on the First Contact</p>
            </div>

            {/* Average Queue Abandon Time */}
            <div className="col-span-4 row-span-2 card bg-tertiary">
                <p>Average Queue Abandon Time</p>
                <MyResponsiveBar data={averageAbandonTime} />
            </div>

            {/* Average Queue Answer Time (ASA) */}
            <div className="col-span-5 row-span-2 card bg-tertiary">
                <p>Average Answer Time per Queue</p>
                <MyResponsiveBar data={averageQueueAnswerTime} />
            </div>

            {/* Cases Created */}
            <div className="col-span-4 row-span-2 card bg-tertiary">
                <p>Cases Created</p>
            </div>

            {/* Cases Resolved */}
            <div className="col-span-4 row-span-2 card bg-tertiary">
                <p>Cases Resolved</p>
            </div>

            {/* Cases Reopened */}
            <div className="col-span-4 row-span-2 card bg-tertiary">
                <p>Cases Reopened</p>
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