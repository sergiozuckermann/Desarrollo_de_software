import React from 'react';
import { useNavigate } from 'react-router-dom';
import CallStatusIndicator from '../components/callStatusIndicator';
import MoodIndicator from '../components/moodIndicator';
import CallTimeDisplay from './callTimeDisplay';
import { Interaction } from '../utils/interfaces';

type CellGridProps = {
  data: Array<Interaction>
};

const CellGrid: React.FunctionComponent<CellGridProps> = ({ data }) => {

  const navigate = useNavigate();

  const handleCardClick = (interaction: Interaction) => {
    const agentInfo = {
      agentFirstName: interaction.agentFirstName,
      key: interaction.key,
      contactId: interaction.contactId,
      state: interaction.state,
      sentiment: interaction.Sentiment,
      routingProfile: interaction.routingProfile,
      username: interaction.username,
    };
    sessionStorage.setItem("selectedAgent", JSON.stringify(agentInfo));
    navigate('/Supervisor/calloverview');
  };
  return (
    <div className="box-border border-[1px] rounded-lg p-4 border-solid border-marco lg:h-[700px] overflow-y-auto">
      <div className="grid sm:grid-cols-2 gap-4">
        
        {data.map((interaction) => (
          <div
            key={interaction.key}
            className="bg-white rounded-lg shadow p-6 border border-gray-300"
            onClick={() => handleCardClick(interaction)}
            style={{ cursor: 'pointer' }}
          >
            <div className="flex flex-col items-center justify-center text-center h-full">
              <div className="flex justify-center items-center mb-4">
                <p className="text-lg font-semibold">{interaction.agentFirstName}</p>
              </div>
              <div className="flex items-center justify-center space-x-4 mb-4">
                <CallStatusIndicator callStatus={interaction.state} />
                <MoodIndicator moodValue={interaction.Sentiment || "NEUTRAL"} />
              </div>
              <div className="flex items-center justify-center">
                <CallTimeDisplay />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CellGrid;