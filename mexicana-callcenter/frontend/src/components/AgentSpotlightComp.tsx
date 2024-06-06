import React from 'react';

interface AgentSpotlightCompProps {
  name: string;
  performance: string;
  image: string;
  lastname: string;
}

const AgentSpotlightComp: React.FC<AgentSpotlightCompProps> = ({
  name,
  performance,
  image,
  lastname,
}) => {
  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 card overflow-hidden" style={{ backgroundColor: '#F8F9FA' }}>
      <div className="max-w-xl mx-auto">
        <div className="flex flex-col items-center">
          <img src={image} alt={`${name}`} className="w-60 h-60 rounded-full object-cover mb-4" />
          <h2 className="text-2xl font-bold mb-2">{name} {lastname}</h2>
          <div className="flex items-center">
            <img src="/badge.svg" alt="Badge" className="w-12 h-12 mr-2" />
            <p className="text-gray-600">{performance}</p>


          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentSpotlightComp;
