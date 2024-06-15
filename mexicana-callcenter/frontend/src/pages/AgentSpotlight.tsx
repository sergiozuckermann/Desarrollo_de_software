// Import the useState and useEffect hooks from React
import { useState, useEffect } from 'react';
// Import the PageStructure component
import PageStructure from "../components/PageStructure";
// Import the AgentSpotlightComp component
import AgentSpotlightComp from "../components/AgentSpotlightComp";
// Import the userService module
import userService from "../services/user";

// Define an interface for the Agent object
interface Agent {
  name: string; // The agent's first name
  performance: string; // The agent's performance rating or description
  image: string; // The URL or path to the agent's profile image
  lastname: string; // The agent's last name
  username: string; // The agent's username
}

// Define the AgentSpotlight functional component
const AgentSpotlight = () => {
  // State to store the fetched agents
  const [agents, setAgents] = useState<Agent[]>([]);
  // State to keep track of the current index for the carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  // State to keep track of the loading state
  const [loading, setLoading] = useState(true);

  // useEffect hook to fetch all agents when the component mounts
  useEffect(() => {
    let fetchedAgents: Agent[]; // Declare the variable fetchedAgents
    userService
      .GetAgents() // Call the GetAgents function from the userService module
      .then((agents) => {
        fetchedAgents = agents.filter((agent: Agent) => agent.performance !== null); // Filter out agents with null performance
        return Promise.all(fetchedAgents.map((agent: Agent) => userService.GetImageUrl(agent.username))); // Get image URLs for each agent
      })
      .then((imageUrls) => {
        setAgents(fetchedAgents.map((agent, index) => ({ ...agent, image: imageUrls[index].imageUrl }))); // Update agents with image URLs
        setLoading(false); // Set loading state to false after data is fetched
      })
      .catch((error) => {
        // Log any errors that occur during the API call
        console.error('Failed to fetch agents:', error);
      });
  }, []); // Empty dependency array to run the effect only once

  // Function to handle the previous button click
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? agents.length - 1 : prevIndex - 1 // Update currentIndex to move to the previous agent
    );
  };

  // Function to handle the next button click
  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === agents.length - 1 ? 0 : prevIndex + 1 // Update currentIndex to move to the next agent
    );
  };

  // If the loading state is true, render a loading message
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        Loading...
      </div>
    );
  }

  // Compute the agents to display in the carousel based on the current index
  const showingAgents = [
    agents[currentIndex], // The current agent
    agents[(currentIndex + 1) % agents.length], // The next agent (wrap around if at the end)
    agents[(currentIndex + 2) % agents.length], // The agent after the next agent (wrap around if at the end)
  ];

  // Render the component
  return (
    <PageStructure title="Agent Spotlight">
      {/* Render the carousel */}
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex grid grid-cols-1 lg:grid-cols-3 items-center ml-4">
          {/* Render the previous agent */}
          <div className="col-span-1 p-4 flex-shrink-0 scale-75 lg:block hidden">
            <AgentSpotlightComp
              name={(showingAgents[0]?.name.charAt(0).toUpperCase() + showingAgents[0]?.name.slice(1)) + ' '} // Capitalize the first name
              lastname={(showingAgents[0]?.lastname.charAt(0).toUpperCase() + showingAgents[0]?.lastname.slice(1)) + ' '} // Capitalize the last name
              performance={showingAgents[0]?.performance || ''} // Use an empty string if performance is falsy
              image={showingAgents[0]?.image || ''} // Use an empty string if image is falsy
            />
          </div>
          {/* Render the current agent */}
          <div className="col-span-1 p-4 flex-shrink-0 scale-120">
            <AgentSpotlightComp
              name={(showingAgents[1]?.name.charAt(0).toUpperCase() + showingAgents[1]?.name.slice(1)) + ' '} // Capitalize the first name
              lastname={(showingAgents[1]?.lastname.charAt(0).toUpperCase() + showingAgents[1]?.lastname.slice(1)) + ' '} // Capitalize the last name
              performance={showingAgents[1]?.performance || ''} // Use an empty string if performance is falsy
              image={showingAgents[1]?.image || ''} // Use an empty string if image is falsy
            />
          </div>
          {/* Render the next agent */}
          <div className="col-span-1 p-4 flex-shrink-0 scale-75 lg:block hidden">
            <AgentSpotlightComp
              name={(showingAgents[2]?.name.charAt(0).toUpperCase() + showingAgents[2]?.name.slice(1)) + ' '} // Capitalize the first name
              lastname={(showingAgents[2]?.lastname.charAt(0).toUpperCase() + showingAgents[2]?.lastname.slice(1)) + ' '} // Capitalize the last name
              performance={showingAgents[2]?.performance || ''} // Use an empty string if performance is falsy
              image={showingAgents[2]?.image || ''} // Use an empty string if image is falsy
            />
          </div>
        </div>
        {/* Render the previous and next buttons */}
        <div className="flex justify-center mt-6 ml-4">
          <button onClick={handlePrevClick} className="mr-12">
            <img src="/back.svg" alt="Previous Arrow" />
          </button>
          <button onClick={handleNextClick}>
            <img src="/next.svg" alt="Next Arrow" />
          </button>
        </div>
      </div>
    </PageStructure>
  );
};

// Export the AgentSpotlight component as the default export
export default AgentSpotlight;