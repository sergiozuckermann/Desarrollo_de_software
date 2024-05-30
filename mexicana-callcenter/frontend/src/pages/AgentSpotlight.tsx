import { useState, useEffect } from 'react';
import PageStructure from "../components/PageStructure";
import AgentSpotlightComp from "../components/AgentSpotlightComp";
import agentService from "../services/agentSpotlight";

interface Agent {
  name: string;
  performance: string;
  image: string;
}

const AgentSpotlight = () => {
  // State to store the fetched agents
  const [agents, setAgents] = useState<Agent[]>([]);
  // State to keep track of the current index for the carousel
  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect hook to fetch all agents when the component mounts
  useEffect(() => {
    agentService
      .getAllAgents()
      .then((fetchedAgents) => {
        // Update the agents state with the fetched data
        setAgents(fetchedAgents);
      })
      .catch((error) => {
        // Log any errors that occur during the API call
        console.error('Failed to fetch agents:', error);
      });
  }, []); // Empty dependency array to run the effect only once

  // Function to handle the previous button click
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? agents.length - 1 : prevIndex - 1
    );
  };

  // Function to handle the next button click
  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === agents.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Compute the agents to display in the carousel based on the current index
  const showingAgents = [
    agents[currentIndex],
    agents[(currentIndex + 1) % agents.length],
    agents[(currentIndex + 2) % agents.length],
  ];

  return (
    <PageStructure title="Agent Spotlight">
      {/* Render the carousel */}
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex grid grid-cols-1 lg:grid-cols-3 items-center ml-4">
          {/* Render the previous agent */}
          <div className="col-span-1 p-4 flex-shrink-0 scale-75 lg:block hidden">
            <AgentSpotlightComp
              name={showingAgents[0]?.name || ''}
              performance={showingAgents[0]?.performance || ''}
              image={showingAgents[0]?.image || ''}
            />
          </div>
          {/* Render the current agent */}
          <div className="col-span-1 p-4 flex-shrink-0 scale-120">
            <AgentSpotlightComp
              name={showingAgents[1]?.name || ''}
              performance={showingAgents[1]?.performance || ''}
              image={showingAgents[1]?.image || ''}
            />
          </div>
          {/* Render the next agent */}
          <div className="col-span-1 p-4 flex-shrink-0 scale-75 lg:block hidden">
            <AgentSpotlightComp
              name={showingAgents[2]?.name || ''}
              performance={showingAgents[2]?.performance || ''}
              image={showingAgents[2]?.image || ''}
            />
          </div>
        </div>
        {/* Render the previous and next buttons */}
        <div className="flex justify-center mt-6 ml-4">
          <button onClick={handlePrevClick} className="mr-12">
            <img src="/public/back.svg" alt="Previous Arrow" />
          </button>
          <button onClick={handleNextClick}>
            <img src="/public/next.svg" alt="Next Arrow" />
          </button>
        </div>
      </div>
    </PageStructure>
  );
};

export default AgentSpotlight;