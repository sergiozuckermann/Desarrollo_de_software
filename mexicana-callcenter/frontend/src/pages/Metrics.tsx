import PageStructure from '../components/PageStructure';
import { FetchMetrics } from '../services/metrics';
import '../css/global.css';
import MyResponsiveBar from '../components/Charts/barChart2';
import GaugeChart from 'react-gauge-chart';
import Filter from '../components/filters';
import { useState } from 'react';

// MainContent component that handles the display and filtering of metrics
const MainContent = () => {
    // State to manage filter criteria
    const [filters, setFilters] = useState({
        name: '',
        manufacturer: '',
        date: new Date(),
        status: ''
    });

    // Function to update filters when applied
    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
    };

    // Fetch metrics data
    const { averageAbandonmentRate, averageAbandonTime, averageQueueAnswerTime, averageAnswerTime } = FetchMetrics();
    console.log(averageAbandonTime, averageQueueAnswerTime, averageAnswerTime);

    // Display loading message until metrics data is available
    if (averageAbandonTime === null || averageQueueAnswerTime === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid w-full h-full grid-cols-12 grid-rows-6 gap-4 p-2 pt-5 overflow-y-auto">
            {/* Abandonment Rate Gauge Chart */}
            <div className="col-span-3 row-span-2 card bg-tertiary">
                <p>Abandonment Rate</p>
                <GaugeChart id="gauge-chart1" nrOfLevels={20} colors={["#84BF68", "#FF5F6D", "#FFC371"]} arcWidth={0.3} percent={averageAbandonmentRate / 100} textColor="#20253F" />
            </div>

            {/* Average Case Resolution Time (currently commented out) */}
            {/* <div className="col-span-3 row-span-2 card bg-tertiary">
                <p>Average Case Resolution Time</p>
                <MyResponsiveBar data={averageAbandonTime} />
                <p>{averageAbandonTime}</p>
            </div> */}

            {/* Average Case Resolution Time (displayed as a static value) */}
            <div className="col-span-3 row-span-2 shadow-lg card bg-tertiary ">
                <div className="flex flex-row items-center justify-between">
                    <div className="px-4 py-4 bg-gray-300 rounded-xl bg-opacity-30">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="inline-flex text-sm text-gray-600 sm:text-base">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        12%
                    </div>
                </div>
                <h1 className="mt-1 text-3xl font-bold text-gray-700 sm:text-m xl:text-4xl">2:43 minutes</h1>
                <div className="flex flex-row justify-between mt-2">
                    <p>Average Case Resolution Time</p>
                </div>
            </div>

            {/* Average Queue Answer Time (ASA) */}
            <div className="col-span-3 row-span-2 shadow-lg card bg-tertiary">
                <div className="flex flex-row items-center justify-between">
                    <div className="px-4 py-4 bg-gray-300 rounded-xl bg-opacity-30">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 111.414-1.414l5 5a1 1 010 1.414l-5 5a1 1 01-1.414 0z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M4.293 15.707a1 1 010-1.414L8.586 10 4.293 5.707a1 1 111.414-1.414l5 5a1 1 010 1.414l-5 5a1 1 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="inline-flex text-sm text-gray-600 sm:text-base">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        12%
                    </div>
                </div>
                <h1 className="mt-1 text-3xl font-bold text-gray-700 sm:text-m xl:text-4xl">{averageAnswerTime} seconds</h1>
                <div className="flex flex-row justify-between mt-2">
                    <p>Average Queue Answer Time (ASA)</p>
                </div>
            </div>

            {/* Filters */}
            <div className="relative w-full h-full col-span-3 row-span-1 p-2 border-gray-400">
                <Filter onApplyFilters={handleApplyFilters} />
            </div>

            {/* Average Queue Answer Time (ASA) */}
            <div className="col-span-3 col-start-10 row-span-3 card bg-tertiary">
                <p>Average Answer Time per Queue</p>
                <MyResponsiveBar data={averageQueueAnswerTime} />
            </div>

            {/* Average Queue Abandon Time */}
            <div className="col-span-5 row-span-2 card bg-tertiary">
                <p>Average Queue Abandon Time</p>
                <MyResponsiveBar data={averageAbandonTime} />
            </div>

            {/* Cases Resolved on the First Contact */}
            <div className="col-span-4 row-span-2 card bg-tertiary">
                <div className="flex flex-row justify-between pb-5 mt-2">
                    <p>Cases Resolved on the First Contact</p>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <div className="px-4 py-4 bg-gray-300 rounded-xl bg-opacity-30">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 111.414-1.414l5 5a1 1 010 1.414l-5 5a1 1 01-1.414 0z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M4.293 15.707a1 1 010-1.414L8.586 10 4.293 5.707a1 1 111.414-1.414l5 5a1 1 010 1.414l-5 5a1 1 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="inline-flex text-sm text-gray-600 sm:text-base">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        12%
                    </div>
                </div>
                <h1 className="mt-1 text-3xl font-bold text-gray-700 sm:text-m xl:text-4xl">7 cases</h1>
            </div>

            {/* Cases Created */}
            <div className="col-span-4 row-span-2 card bg-tertiary">
                <div className="flex flex-row justify-between pb-5 mt-2">
                    <p>Cases Created</p>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <div className="px-4 py-4 bg-gray-300 rounded-xl bg-opacity-30">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 111.414-1.414l5 5a1 1 010 1.414l-5 5a1 1 01-1.414 0z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M4.293 15.707a1 1 010-1.414L8.586 10 4.293 5.707a1 1 111.414-1.414l5 5a1 1 010 1.414l-5 5a1 1 01-1.414 0z" />
                        </svg>
                    </div>
                    <div className="inline-flex text-sm text-gray-600 sm:text-base">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        12%
                    </div>
                </div>
                <h1 className="mt-1 text-3xl font-bold text-gray-700 sm:text-m xl:text-4xl">8 cases</h1>
            </div>

            {/* Cases Resolved */}
            <div className="col-span-4 row-span-2 card bg-tertiary">
                <div className="flex flex-row justify-between pb-5 mt-2">
                    <p>Cases Resolved</p>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <div className="px-4 py-4 bg-gray-300 rounded-xl bg-opacity-30">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 111.414-1.414l5 5a1 1 010 1.414l-5 5a1 1 01-1.414 0z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M4.293 15.707a1 1 010-1.414L8.586 10 4.293 5.707a1 1 111.414-1.414l5 5a1 1 010 1.414l-5 5a1 1 01-1.414 0z" />
                        </svg>
                    </div>
                    <div className="inline-flex text-sm text-gray-600 sm:text-base">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        12%
                    </div>
                </div>
                <h1 className="mt-1 text-3xl font-bold text-gray-700 sm:text-m xl:text-4xl">6 cases</h1>
            </div>

            {/* Cases Reopened */}
            <div className="col-span-4 row-span-2 card bg-tertiary">
                <div className="flex flex-row justify-between pb-5 mt-2">
                    <p>Cases Reopened</p>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <div className="px-4 py-4 bg-gray-300 rounded-xl bg-opacity-30">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 111.414-1.414l5 5a1 1 010 1.414l-5 5a1 1 01-1.414 0z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M4.293 15.707a1 1 010-1.414L8.586 10 4.293 5.707a1 1 111.414-1.414l5 5a1 1 010 1.414l-5 5a1 1 01-1.414 0z" />
                        </svg>
                    </div>
                    <div className="inline-flex text-sm text-gray-600 sm:text-base">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        12%
                    </div>
                </div>
                <h1 className="mt-1 text-3xl font-bold text-gray-700 sm:text-m xl:text-4xl">4 cases</h1>
            </div>
        </div>
    );
};

// Main component that structures the Metrics page
const Metrics = () => {
    return (
        <PageStructure title="Metrics">
            <MainContent />
        </PageStructure>
    );
};

export default Metrics;
