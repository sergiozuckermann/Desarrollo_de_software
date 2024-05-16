import React from 'react';
import { Link } from 'react-router-dom';
import CallStatusIndicator from '../components/callStatusIndicator';
import MoodIndicator from '../components/moodIndicator';
import CallTimeDisplay from './callTimeDisplay';

type CellGridProps = {
  data: [number, number][];
};

const CellGrid: React.FunctionComponent<CellGridProps> = ({ data }) => {
  return (
    <div className="box-border border-[1px] rounded-lg shadow p-4 border-solid border-marco shadow-lg lg:h-[700px] overflow-y-auto">
      <div className="grid sm:grid-cols-2 gap-4">
        {data.map(([callStatus, moodValue], index) => (
          <Link
            to="/Supervisor/calloverview"
            key={index}
            className="bg-white rounded-lg shadow p-6 border border-gray-300"
          >
            <div className="flex flex-col items-center justify-center text-center h-full">
              <div className="flex justify-center items-center mb-4">
                <p className="text-lg font-semibold">Agent</p>
              </div>
              <div className="flex items-center justify-center space-x-4 mb-4">
                <CallStatusIndicator callStatus={callStatus} />
                <MoodIndicator moodValue={moodValue} />
              </div>
              <div className="flex items-center justify-center">
                <CallTimeDisplay />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CellGrid;