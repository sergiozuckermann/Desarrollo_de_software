import React from 'react';

interface CallCardProps {
  agentname: string;
  agentposition: string;
  callclasification: string;
  clientname: string;
  priority: string;
  reason: string;
  talktime: string;
}

const CallCard: React.FC<CallCardProps> = ({ agentname, agentposition, callclasification, clientname, priority, reason, talktime }) => {
  return (
    <div className="p-4 bg-white rounded-md shadow-lg card dark:bg-primary">
      {/* Large Device Layout */}
      <div className="flex-col items-center justify-center hidden h-full md:flex">
        <div className="max-w-sm">
          <div className="flex justify-center mb-4">
            <img className="w-[65%] h-[65%] rounded-full" src="/avatar.png" alt="User avatar" />
          </div>
          <div className="text-center">
          <h2 className="pb-0 mb-2 dark:text-white">{agentname}</h2>
            <p className="pb-6 lg:pb-7 text-base text-gray-700 dark:text-[#808080]"><strong>{agentposition}</strong></p>
            <p className="pb-6 lg:pb-7text-sm text-gray-600 dark:text-white"> <strong>Classification: </strong>{callclasification} </p>
            <p className="pb-6 lg:pb-7 text-base text-gray-600 dark:text-white"><strong>Client name: </strong> {clientname}</p>
            <p className="pb-6 lg:pb-7 text-base text-gray-600 dark:text-white"><strong>Priority : </strong>{priority}</p>
            <p className="pb-6 lg:pb-7 text-base text-gray-600 dark:text-white"><strong>Reason: </strong>{reason}</p>
            <p className="pb-6 lg:pb-7 text-base text-gray-600 dark:text-white"><strong>Talk time: </strong>{talktime}</p>
          </div>
        </div>
      </div>

      {/* Small Device Layout */}
      <div className="pt-40 overflow-hidden bg-white border border-gray-300 rounded-lg 2sm:p-2 md:hidden ">
        <div className="text-center">
          <p>{agentname}</p>
          <p><strong>{agentposition}</strong></p>
          <p><strong>Classification: </strong> {callclasification}</p>
          <p><strong>Client name: </strong> {clientname}</p>
          <p><strong>Priority: </strong> {priority}</p>
          <p><strong>Reason: </strong> {reason}</p>
          <p><strong>Talk time: </strong> {talktime}</p>
        </div>
      </div>
    </div>
  );
};

export default CallCard;
