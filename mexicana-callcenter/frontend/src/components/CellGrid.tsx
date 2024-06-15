// Import the React library
import React from 'react';
// Import the useNavigate hook from react-router-dom
import { useNavigate } from 'react-router-dom';
// Import the CallStatusIndicator component
import CallStatusIndicator from '../components/callStatusIndicator';
// Import the MoodIndicator component
import MoodIndicator from '../components/moodIndicator';

// Import the Interaction interface from '../utils/interfaces'
import { Interaction } from '../utils/interfaces';

// Define the prop types for the CellGrid component
type CellGridProps = {
  data: Array<Interaction>; // The data prop should be an array of Interaction objects
};

// Define the CellGrid component as a functional component
const CellGrid: React.FunctionComponent<CellGridProps> = ({ data }) => {
  // Use the useNavigate hook from react-router-dom
  const navigate = useNavigate();

  // Define a function to handle card click events
  const handleCardClick = (interaction: Interaction) => {
    // Create an object with the relevant agent information
    const agentInfo = {
      agentFirstName: interaction.agentFirstName, // The first name of the agent associated with the interaction
      key: interaction.key, // A unique key or identifier for the interaction
      contactId: interaction.contactId, // The ID of the contact or customer involved in the interaction
      state: interaction.state, // The current state or status of the interaction (e.g., "in-progress", "on-hold", "completed")
      sentiment: interaction.Sentiment, // The sentiment or mood value associated with the interaction (e.g., "POSITIVE", "NEGATIVE", "NEUTRAL")
      routingProfile: interaction.routingProfile, // The routing profile or queue that the interaction belongs to
      username: interaction.username, // The username of the agent associated with the interaction
    };
    // Store the agent information in the session storage
    sessionStorage.setItem("selectedAgent", JSON.stringify(agentInfo));
    // Navigate to the '/Supervisor/calloverview' route
    navigate('/Supervisor/calloverview');
  };

  // Render the CellGrid component
  return (
    <div className="box-border border-[1px] rounded-lg p-4 border-solid border-marco lg:h-[700px] overflow-y-auto">
      {/* Container div with various styles, including rounded corners, border, padding, and height/scrolling behavior */}
      <div className="grid sm:grid-cols-2 gap-4">
        {data.map((interaction) => (
          interaction.agentFirstName && (
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
                {/* <div className="flex items-center justify-center">
                  <CallTimeDisplay />
                </div> */}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

// Export the CellGrid component as the default export
export default CellGrid;