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
    <div className="box-border border-[1px] rounded-lg shadow p-4 border-solid border-marco shadow-lg">
      <div className="grid grid-cols-2 gap-4 overflow-y-auto h-[600px]">
        {data.map(([callStatus, moodValue], index) => (
          <Link to="/Supervisor/bargein" key={index} className="bg-white rounded-lg shadow p-6 border border-gray-300">
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-semibold">Nombre del agente</p>
              </div>
              <div className="flex items-center justify-between" >
                <CallStatusIndicator callStatus={callStatus} />
                <MoodIndicator moodValue={moodValue} />
              </div>
              <div className="flex items-center justify-between">
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