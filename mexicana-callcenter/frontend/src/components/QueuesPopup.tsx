// Import the React library
import React from 'react';
// Import the GraphAgentStructure component and the PieChartDataItem type
import GraphAgentStructure, { PieChartDataItem } from './GraphAgentStructure';

// Define the interface for the PopUp component props
interface PopUpProps {
  isVisible: boolean; // A boolean indicating if the pop-up should be visible
  onClose: () => void; // A function to be called when the pop-up is closed
  agentsState: Array<PieChartDataItem>; // An array of PieChartDataItem objects representing the agent state data
  agentsAvailability: Array<PieChartDataItem>; // An array of PieChartDataItem objects representing the agent availability data
}

// Define the PopUp component as a React functional component
const PopUp: React.FC<PopUpProps> = ({ isVisible, onClose, agentsState, agentsAvailability }) => {
  // If the isVisible prop is false, return null (don't render anything)
  if (!isVisible) return null;

  // Render the component
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay div with a semi-transparent black background */}
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative w-full max-w-4xl p-8 bg-white rounded shadow-lg">
        {/* Pop-up container with styles */}
        <button className="absolute text-gray-500 top-2 right-2" onClick={onClose}>
          X
        </button>
        {/* Close button */}
        <GraphAgentStructure agentsState={agentsState} agentsAvailability={agentsAvailability} />
        {/* Render the GraphAgentStructure component and pass the agentsState and agentsAvailability props */}
      </div>
    </div>
  );
};

// Export the PopUp component as the default export
export default PopUp;