import React from 'react';

interface MyBadgesCompProps  {
  name: string;
  performance: string;
  image: string;
}

const AgentSpotlightComp: React.FC<MyBadgesCompProps > = ({
  name,
  performance,
  image,
}) => {
  console.log('MyBadgesComp props:', { name, performance, image });
  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 card overflow-hidden" style={{ backgroundColor: '#F8F9FA' }}>
      <div className="max-w-xl mx-auto">
        <div className="flex items-center">
          <img src={image} alt={`${name}`} className="w-40 h-40 rounded-full object-cover mr-8" />
          <div>
            <h2 className="text-3xl font-bold mb-2">{name}</h2>
            <div className="flex items-center">
              <img src="/badge.svg" alt="Badge" className="w-12 h-12 mr-4" />
              <p className="text-gray-600 text-xl">{performance}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentSpotlightComp;