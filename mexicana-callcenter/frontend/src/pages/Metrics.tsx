
import PageStructure from '../components/PageStructure';
import { FetchMetrics } from '../services/metrics';


const MainContent = () => {
     const { averageAbandonmentRate, averageAbandonTime, averageQueueAnswerTime } = FetchMetrics();
     return (
        <div className="grid w-full h-full grid-cols-12 grid-rows-6 gap-4 p-2 pt-5 overflow-y-auto">

            {/* Abandonment Rate */}
            <div className="w-full h-full col-span-3 row-span-2 p-3 border-2 border-gray-400 shadow-lg bg-tertiary rounded-xl">
                <p>Abandonment Rate</p>
                <p>{averageAbandonmentRate}</p>

            </div>

            {/* Average Case Resolution Time */}
            <div className="w-full h-full col-span-3 row-span-2 p-3 border-2 border-gray-400 shadow-lg bg-tertiary rounded-xl">
                <p>Average Case Resolution Time</p>
                <p>{averageAbandonTime}</p>
            </div>

            {/* Average Contacts per Case */}
            <div className="w-full h-full col-span-3 row-span-2 p-3 border-2 border-gray-400 shadow-lg bg-tertiary rounded-xl">
                <p>Average Answer Time per Queue</p>
                <p>{averageQueueAnswerTime}</p>
            </div>

            {/* Filters */}
            <div className="w-full h-full col-span-3 row-span-1 p-3 border-2 border-gray-400 shadow-lg bg-tertiary rounded-xl">
                <p>Filters</p>
            </div>

            {/* Cases Resolved on the First Contact */}
            <div className="w-full h-full col-span-3 col-start-10 row-span-3 p-3 border-2 border-gray-400 shadow-lg bg-tertiary rounded-xl">
                <p>Cases Resolved on the First Contact</p>
            </div>

            {/* Average Queue Abandon Time */}
            <div className="w-full h-full col-span-4 row-span-2 p-3 border-2 border-gray-400 shadow-lg bg-tertiary rounded-xl">
                <p>Average Queue Abandon Time</p>
            </div>

            {/* Average Queue Answer Time (ASA) */}
            <div className="w-full h-full col-span-5 row-span-2 p-3 border-2 border-gray-400 shadow-lg bg-tertiary rounded-xl">
                <p>Average Queue Answer Time (ASA)</p>
            </div>

            {/* Cases Created */}
            <div className="w-full h-full col-span-4 row-span-2 p-3 border-2 border-gray-400 shadow-lg bg-tertiary rounded-xl">
                <p>Cases Created</p>
            </div>

            {/* Cases Resolved */}
            <div className="w-full h-full col-span-4 row-span-2 p-3 border-2 border-gray-400 shadow-lg bg-tertiary rounded-xl">
                <p>Cases Resolved</p>
            </div>

            {/* Cases Reopened */}
            <div className="w-full h-full col-span-4 row-span-2 p-3 border-2 border-gray-400 shadow-lg bg-tertiary rounded-xl">
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
