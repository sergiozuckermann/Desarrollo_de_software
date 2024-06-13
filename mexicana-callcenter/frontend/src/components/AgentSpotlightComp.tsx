// Import the React library
import React from 'react';

// Define the props interface for the AgentSpotlightComp component
interface AgentSpotlightCompProps {
  name: string; // The agent's first name
  performance: string; // The agent's performance rating or description
  image: string; // The URL or path to the agent's profile image
  lastname: string; // The agent's last name
}

// Define the AgentSpotlightComp component as a React functional component
const AgentSpotlightComp: React.FC<AgentSpotlightCompProps> = ({
  name, // Destructure the 'name' prop
  performance, // Destructure the 'performance' prop
  image, // Destructure the 'image' prop
  lastname, // Destructure the 'lastname' prop
}) => {
  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 card overflow-hidden bg-[#F8F9FA] dark:bg-slate-700">
      <div className="max-w-xl mx-auto">
        <div className="flex flex-col items-center">
          {/* Display the agent's profile image */}
          <img src={image} alt={`${name}`} className="w-60 h-60 rounded-full object-cover mb-4" />
          {/* Display the agent's full name */}
          <h2 className="text-2xl font-bold mb-2 dark:text-white">{name} {lastname}</h2>
          <div className="flex items-center">
            {/* Display a badge icon */}
            <img src="/badge.svg" alt="Badge" className="w-12 h-12 mr-2" />
            {/* Display the agent's performance rating or description */}
            <p className="text-gray-600 dark:text-white">{performance}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the AgentSpotlightComp component as the default export
export default AgentSpotlightComp;