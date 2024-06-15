// Import the React library
import React from 'react';
import CallStatusIndicator from '../components/callStatusIndicator';

// Define the interface for the CallCardProps
interface CallCardProps {
  agentname: string;
  agentposition: string;
  agentState: string;
  agentQueue: string;
  actualSentiment: string;
  contactID: string;
  talktime: string;
  username: string;
  routingProfile: string;
  imageURL: string;
}

const CallCard: React.FC<CallCardProps> = ({
  agentname,
  agentposition,
  agentState,
  agentQueue,
  actualSentiment,
  contactID,
  talktime,
  routingProfile,
  imageURL
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-[100%] w-full">
      {/* Large Device Layout */}
      <div className="hidden w-full h-[96%] md:block pt-[12%]">
        <div className="flex flex-col items-center justify-center h-[100%] p-8 overflow-hidden shadow-xl rounded-xl card">
          <div className="flex justify-center p-4">
            <img className="rounded-full w-36 h-36" src={imageURL || "/avatar.png"} alt="User avatar" />
          </div>
          <div className="items-center px-8 py-4 text-center">
            <h2 className="pb-2 mb-2 text-lg">{agentname}</h2>
            <p className="pb-6 text-base text-gray-700"><strong>{agentposition}</strong></p>
            <p className="pb-6 text-sm text-gray-600"><strong>Agent queue: </strong>{routingProfile}</p>
            <p className="pb-6 text-sm text-gray-600"><strong>Agent state: </strong><div style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}><CallStatusIndicator callStatus={agentState} /></div></p>
            <p className="pb-6 text-base text-gray-600"><strong>Actual Sentiment: </strong>{actualSentiment}</p>
            <p className="pb-6 text-base text-gray-600"><strong>Contact ID: </strong>{contactID}</p>
            <p className="pb-6 text-base text-gray-600"><strong>Talk time: </strong>{talktime}</p>
          </div>
        </div>
      </div>

      {/* Small Device Layout */}
      <div className="block w-full md:hidden">
        <div className="flex flex-col items-center justify-center h-full p-6 overflow-hidden bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="text-center">
            <p>{agentname}</p>
            <p><strong>{agentposition}</strong></p>
            <p><strong>Agent standard queue: </strong> {agentQueue}</p>
            <p><strong>Agent state: </strong> {agentState}</p>
            <p><strong>Actual Sentiment: </strong> {actualSentiment}</p>
            <p><strong>Contact ID: </strong> {contactID}</p>
            <p><strong>Talk time: </strong> {talktime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the CallCard component as the default export
export default CallCard;