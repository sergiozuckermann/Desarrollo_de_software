import React from 'react';
import CallStatusIndicator from '../components/callStatusIndicator';
import MoodIndicator from '../components/moodIndicator';

type CellGridProps = {
  data: [number, number][];
};

const CellGrid: React.FunctionComponent<CellGridProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 overflow-y-scroll h-[600px] "> {/* Adjusted gap and padding */}
      {data.map(([callStatus, moodValue], index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6 border border-gray-300"> {/* Adjusted background, border, and shadow */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-4"> {/* Added margin-bottom */}
              <p className="text-lg font-semibold">Nombre del agente</p> {/* Adjusted font size and weight */}
            </div>
            <div className="flex items-center justify-between">
              <CallStatusIndicator callStatus={callStatus} />
              <MoodIndicator moodValue={moodValue} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CellGrid;
