import React from 'react';

// variables 
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
    return(
    <div>
      {/* Large Device Layout */}
      <div className="hidden md:block lg:mt-20 lg:h-[95%]">
        <div className="hidden max-w-sm p-4 overflow-hidden border-2 border-gray-400 shadow-lg rounded-xl md:block bg-tertiary h-[20%] justify-center items-center"> 
          <div className="flex justify-center">
            <img className="w-[65%] h-[65%] rounded-full" src="/avatar.png" alt="User avatar" />
          </div>
          <div className="items-center px-6 py-4 text-center">
            <h2 className="pb-0 mb-2">{agentname}</h2>
            <p className="pb-6 lg:pb-7 text-base text-gray-700"><strong>{agentposition}</strong></p>
            <p className="pb-6 lg:pb-7text-sm text-gray-600"> <strong>Classification: </strong>{callclasification} </p>
            <p className="pb-6 lg:pb-7 text-base text-gray-600"><strong>Client name: </strong> {clientname}</p>
            <p className="pb-6 lg:pb-7 text-base text-gray-600"><strong>Priority : </strong>{priority}</p>
            <p className="pb-6 lg:pb-7 text-base text-gray-600"><strong>Reason: </strong>{reason}</p>
            <p className="pb-6 lg:pb-7 text-base text-gray-600"><strong>Talk time: </strong>{talktime}</p>
            {/* <div className="flex items-center justify-center w-full pb-9">
              <div className="text-gray-800 text-[60px] font-roboto mr-4">{points}</div>
              <img src="/plane.svg" alt="Plane" className="w-10 h-10 rotate(-45deg)" />
            </div> */}
          </div>
        </div>
      </div>

      {/* Small Device Layout */}
      <div className="pt-40 overflow-hidden bg-white border border-gray-300 rounded-lg 2sm:p-2 md:hidden">
        <div className="text-center">
          <p>{agentname}</p>
          <p><strong>{agentposition}</strong></p>
          <p><strong>Classification: </strong> {callclasification}</p>
          <p><strong>Client name: </strong> {clientname}</p>
          <p><strong>Priority : </strong> {priority}</p>
          <p><strong>Reason: </strong> {reason}</p>
          <p><strong>Talk time: </strong> {talktime}</p>
        </div>
      </div>
    </div>
    )
};
export default CallCard;