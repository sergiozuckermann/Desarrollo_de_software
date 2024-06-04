import { useState, useEffect } from 'react';
import PageStructure from "../components/PageStructure";
import AgentSpotlightComp from "../components/AgentSpotlightComp";
import myBadgesService from "../services/myBadges";

interface Agent {
  name: string;
  performance: string;
  image: string;
}

const MyBadges = () => {
  // State to store the fetched agents
  const [agents, setAgents] = useState<Agent[]>([]);
  // State to keep track of the current index for the carousel
  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect hook to fetch all agents when the component mounts
  useEffect(() => {
    myBadgesService
      .getAgent()
      .then((fetchedAgent) => {
        // Update the agents state with the fetched data
        setAgents(fetchedAgent);
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

  // Get the current badge to display
  const currentBadge = agents[currentIndex];

  return (
    <PageStructure title="My Badges">
      {/* Render the carousel */}
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex items-center">
          <div className="flex flex-col items-center">
            {/* Render the current badge */}
            <div className="flex-shrink-0">
              <AgentSpotlightComp
                name={currentBadge?.name || ''}
                performance={currentBadge?.performance || ''}
                image={currentBadge?.image || ''}
              />
            </div>
          </div>

          {/* Render the buttons */}
          <div className="flex flex-col ml-8">
            {/* Render the previous button */}
            <button onClick={handlePrevClick} className="mb-4">
              <img src="/public/up.svg" alt="Previous Arrow" />
            </button>
            {/* Render the next button */}
            <button onClick={handleNextClick}>
              <img src="/public/down.svg" alt="Next Arrow" />
            </button>
          </div>
        </div>
      </div>
    </PageStructure>
  );
};

export default MyBadges;