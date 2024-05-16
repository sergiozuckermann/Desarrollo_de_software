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

    const { averageAbandonmentRate, averageAbandonTime, averageQueueAnswerTime } = FetchMetrics();
    console.log(averageAbandonTime, averageQueueAnswerTime);

    if (averageAbandonTime === null || averageQueueAnswerTime === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid w-full h-full grid-cols-12 grid-rows-6 gap-4 p-2 pt-5 overflow-y-auto">

            {/* Abandonment Rate */}
            <div className="relative w-full h-full col-span-3 row-span-2 p-3 border-2 border-gray-400 shadow-lg bg-tertiary rounded-xl">
                <p>Abandonment Rate</p>
                <GaugeChart id="gauge-chart1" nrOfLevels={20} colors={["#84BF68", "#FF5F6D", "#FFC371"]} arcWidth={0.3} percent={averageAbandonmentRate / 100} textColor="#20253F" />
            </div>

            {/* Average Case Resolution Time */}
            <div className="relative w-full h-full col-span-3 row-span-2 p-3 border-2 border-gray-400 shadow-lg bg-tertiary rounded-xl">
                <p>Average Case Resolution Time</p>
                {/* <MyResponsiveBar data={averageAbandonTime} />
                <p>{averageAbandonTime}</p> */}
              
            </div>

            {/* Average Contacts per Case */}
            <div className="relative w-full h-full col-span-3 row-span-2 p-3 border-2 border-gray-400 bg-tertiary rounded-xl">
                <p>Average Answer Time per Queue</p>
                {/* <p>{averageQueueAnswerTime}</p> */}
            </div>

            {/* Filters */}
            <div className="relative w-full h-full col-span-3 row-span-1 p-2 border-gray-400">
                <Filter onApplyFilters={handleApplyFilters} />
            </div>

            {/* Cases Resolved on the First Contact */}
            <div className="relative w-full h-full col-span-3 col-start-10 row-span-3 p-3 border-2 border-gray-400 shadow-lg bg-tertiary rounded-xl">
                <p>Cases Resolved on the First Contact</p>
            </div>

            {/* Average Queue Abandon Time */}
            <div className="relative w-full h-full col-span-4 row-span-2 p-3 border-2 border-gray-400 shadow-lg bg-tertiary rounded-xl">
                <p>Average Queue Abandon Time</p>
                <MyResponsiveBar data={averageAbandonTime} />
            </div>

            {/* Average Queue Answer Time (ASA) */}
            <div className="relative w-full h-full col-span-5 row-span-2 p-3 border-2 border-gray-400 shadow-lg bg-tertiary rounded-xl">
                <p>Average Queue Answer Time (ASA)</p>
                <MyResponsiveBar data={averageQueueAnswerTime} />
            </div>

            {/* Cases Created */}
            <div className="relative w-full h-full col-span-4 row-span-2 p-3 border-2 border-gray-400 shadow-lg bg-tertiary rounded-xl">
                <p>Cases Created</p>
            </div>

            {/* Cases Resolved */}
            <div className="relative w-full h-full col-span-4 row-span-2 p-3 border-2 border-gray-400 shadow-lg bg-tertiary rounded-xl">
                <p>Cases Resolved</p>
            </div>

            {/* Cases Reopened */}
            <div className="relative w-full h-full col-span-4 row-span-2 p-3 border-2 border-gray-400 shadow-lg bg-tertiary rounded-xl">
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
