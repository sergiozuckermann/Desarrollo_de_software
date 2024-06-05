import { useState, useEffect } from 'react';
import PageStructure from "../components/PageStructure";
import MyBadgesComp from "../components/MyBadgesComp";
import userService from "../services/user";
import { useAuth } from "../hooks/useAuth";

interface Agent {
  name: string;
  performance: string;
  image: string;
}

const MyBadges = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { role, username } = useAuth();
  const [isLoading, setIsLoading] = useState(true);  // Loading state
  const [error, setError] = useState<string | null>(null);  // Error state

  useEffect(() => {
    console.log('Fetching agent info for:', { role, username });

    let fetchedAgents: Agent[] = [];

    userService
      .GetInfo(role!, username!)
      .then((fetchedAgent) => {
        console.log('Fetched agent:', fetchedAgent);
        // If fetchedAgent is an object, convert it to an array
        const agentsArray = Array.isArray(fetchedAgent) ? fetchedAgent : [fetchedAgent];
        fetchedAgents = agentsArray;
        // Fetch image URLs for each agent
        return Promise.all(agentsArray.map((agent) => userService.GetImageUrl(agent.username)));
      })
      .then((imageUrls) => {
        setAgents(fetchedAgents.map((agent, index) => ({ ...agent, image: imageUrls[index].imageUrl })));
        setIsLoading(false);  // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error('Failed to fetch agents:', error);
        setError('Failed to fetch agents');
        setIsLoading(false);  // Set loading to false even if there is an error
      });
  }, [role, username]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? agents.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === agents.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentBadge = agents[currentIndex];
  console.log('Current badge:', currentBadge);

  if (isLoading) {
    return <PageStructure title="My Badges"><div>Loading...</div></PageStructure>;
  }

  if (error) {
    return <PageStructure title="My Badges"><div>{error}</div></PageStructure>;
  }

  return (
    <PageStructure title="My Badges">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex items-center">
          <div className="flex flex-col items-center">
            <div className="flex-shrink-0">
              <MyBadgesComp
                name={currentBadge?.name || ''}
                performance={currentBadge?.performance || ''}
                image={currentBadge?.image || ''}
              />
            </div>
          </div>
          <div className="flex flex-col ml-8">
            <button onClick={handlePrevClick} className="mb-4">
              <img src="/up.svg" alt="Previous Arrow" />
            </button>
            <button onClick={handleNextClick}>
              <img src="/down.svg" alt="Next Arrow" />
            </button>
          </div>
        </div>
      </div>
    </PageStructure>
  );
};

export default MyBadges;
