// Code that creates the MyBadgesComp component 

import React from 'react';

// Define the props that the component will receive
interface MyBadgesCompProps  {
  name: string; // The agent's name
  performance: string; // The agent's performance description
  image: string;// URL of the agent's image
}

// Define the component
const AgentSpotlightComp: React.FC<MyBadgesCompProps > = ({
  name,
  performance,
  image,
}) => {
  console.log('MyBadgesComp props:', { name, performance, image }); // Log props to the console for debugging
  // Returns my badges component
  return (
     // Main container div with utility classes for styling
    <div className="w-full p-4 sm:p-6 lg:p-8 card overflow-hidden bg-[#F8F9FA] dark:bg-slate-700">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center">
          {/* Agent's image with styling */}
          <img src={image} alt={`${name}`} className="object-cover w-40 h-40 mr-8 rounded-full" />
          <div>
            {/* Agent's name with styling */}
            <h2 className="mb-2 text-3xl font-bold dark:text-white">{name}</h2>
            <div className="flex items-center">
               {/* Badge icon */}
              <img src="/badge.svg" alt="Badge" className="w-12 h-12 mr-4" />
              <p className="text-xl text-gray-600 dark:text-white">{performance}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentSpotlightComp;