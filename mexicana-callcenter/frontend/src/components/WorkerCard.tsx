import React from 'react';
import { WorkerCardProps } from '../utils/interfaces';

const WorkerCard: React.FC<WorkerCardProps> = ({ imageURL, name, position, experience, points, status }) => {
  const statusClass = status === 'Active' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div>
      {/* Large Device Layout */}
      <div className="hidden h-[65%] max-w-sm p-4 overflow-hidden border-2 border-gray-400 rounded-xl md:block bg-tertiary">
        <div className="flex justify-center">
          <img className="w-[65%] h-[65%] rounded-full" src={imageURL} alt="User avatar" />
        </div>
        <div className="items-center px-6 py-4 text-center">
          <h2 className="pb-5 mb-2">{name}</h2>
          <p className="pb-1 text-base text-gray-700">{position}</p>
          <p className="pb-5 text-sm text-gray-600">{experience} years</p>
          <div className="flex flex-col"> 
            <h3 className="text-gray-800 text-[30px] font-roboto mr-4">Experience Points: </h3> {/* ESTE COMPONENTE TAMBIÉN LO QUIERO RENDERIZADO PARA EL SUPERVISOR, para el agente PONERLO para el supervisor quitarlo*/}
            <div className="flex items-center justify-center w-full pb-9">
              <div className="text-gray-800 text-[60px] font-roboto mr-4">{points}</div>
              <img src="/plane.svg" alt="Plane" className="w-10 h-10 rotate(-45deg)" />
            </div>
          </div>
        </div>
      </div>

      {/* Small Device Layout */}
      <div className="pt-40 overflow-hidden bg-white border border-gray-300 rounded-lg 2sm:p-2 md:hidden">
        <div className="text-center">
          <p>{name}</p>
          <button className={`${statusClass} text-white font-bold py-1 px-2 rounded-lg w-full`}>
            {status}
          </button>
        </div>
      </div>
    </div>
  );
};
export default WorkerCard;