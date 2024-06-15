// Import the useState and useEffect hooks from the 'react' library
import { useState, useEffect } from 'react';
// Import the PageStructure component from the "../components/PageStructure" module
import PageStructure from "../components/PageStructure";
// Import the MyBadgesComp component from the "../components/MyBadgesComp" module
import MyBadgesComp from "../components/MyBadgesComp";
// Import the userService module from the "../services/user" module
import userService from "../services/user";
// Import the useAuth hook from the "../hooks/useAuth" module
import { useAuth } from "../hooks/useAuth";

// Define the Agent interface
interface Agent {
  // Define the properties of an Agent object
  name: string;
  performance: string;
  image: string;
}

// Define the MyBadges component
const MyBadges = () => {
  // Declare a state variable 'agents' with its type as an array of Agent objects and initialize it as an empty array
  // Declare the 'setAgents' function to update the 'agents' state
  const [agents, setAgents] = useState<Agent[]>([]);
  // Declare a state variable 'currentIndex' and initialize it to 0
  // Declare the 'setCurrentIndex' function to update the 'currentIndex' state
  const [currentIndex, setCurrentIndex] = useState(0);
  // Destructure the 'role' and 'username' variables from the 'useAuth' hook
  const { role, username } = useAuth();
  // Declare a state variable 'isLoading' and initialize it to true
  // Declare the 'setIsLoading' function to update the 'isLoading' state
  const [isLoading, setIsLoading] = useState(true);
  // Declare a state variable 'error' with its type as string or null and initialize it to null
  // Declare the 'setError' function to update the 'error' state
  const [error, setError] = useState<string | null>(null);

  // Use the useEffect hook to perform side effects when the component mounts or when 'role' or 'username' changes
  useEffect(() => {
    // Log the 'role' and 'username' values
    console.log('Fetching agent info for:', { role, username });

    // Declare a variable 'fetchedAgents' of type Agent[] and initialize it as an empty array
    let fetchedAgents: Agent[] = [];

    // Call the 'GetInfo' method of the 'userService' module with 'role' and 'username' as arguments
    userService
      .GetInfo(role!, username!)
      .then((fetchedAgent) => {
        // Log the fetched agent data
        console.log('Fetched agent:', fetchedAgent);
        // If 'fetchedAgent' is an object, convert it to an array, otherwise use 'fetchedAgent' as is
        const agentsArray = Array.isArray(fetchedAgent) ? fetchedAgent : [fetchedAgent];
        // Assign the 'agentsArray' to 'fetchedAgents'
        fetchedAgents = agentsArray;
        // Fetch the image URLs for each agent using the 'GetImageUrl' method of the 'userService' module
        return Promise.all(agentsArray.map((agent) => userService.GetImageUrl(agent.username)));
      })
      .then((imageUrls) => {
        // Update the 'agents' state by mapping the 'fetchedAgents' array and adding the corresponding image URL to each agent object
        setAgents(fetchedAgents.map((agent, index) => ({ ...agent, image: imageUrls[index].imageUrl })));
        // Set the 'isLoading' state to false once the data is fetched
        setIsLoading(false);
      })
      .catch((error) => {
        // Log any errors that occur during the fetching process
        console.error('Failed to fetch agents:', error);
        // Set the 'error' state with an error message
        setError('Failed to fetch agents');
        // Set the 'isLoading' state to false even if there is an error
        setIsLoading(false);
      });
  }, [role, username]); // Specify 'role' and 'username' as dependencies for the useEffect hook

  // Define a function to handle the click event of the previous button
  const handlePrevClick = () => {
    // Update the 'currentIndex' state based on the previous index
    setCurrentIndex((prevIndex) =>
      // If the previous index is 0, set it to the last index of the 'agents' array, otherwise decrement the index by 1
      prevIndex === 0 ? agents.length - 1 : prevIndex - 1
    );
  };

  // Define a function to handle the click event of the next button
  const handleNextClick = () => {
    // Update the 'currentIndex' state based on the next index
    setCurrentIndex((prevIndex) =>
      // If the previous index is the last index of the 'agents' array, set it to 0, otherwise increment the index by 1
      prevIndex === agents.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Get the current badge based on the 'currentIndex'
  const currentBadge = agents[currentIndex];
  // Log the current badge
  console.log('Current badge:', currentBadge);

  // If 'isLoading' is true, render a loading message within the PageStructure component
  if (isLoading) {
    return <PageStructure title="My Badges"><div>Loading...</div></PageStructure>;
  }

  // If there is an error, render an error message within the PageStructure component
  if (error) {
    return <PageStructure title="My Badges"><div>{error}</div></PageStructure>;
  }

  // Render the MyBadges component
  return (
    // Render the PageStructure component with the title "My Badges"
    <PageStructure title="My Badges">
      {/* Render a container div with flexbox styles */}
      <div className="flex flex-col items-center justify-center h-full">
        {/* Render a div to hold the badge and navigation buttons */}
        <div className="flex items-center">
          {/* Render a div to hold the badge */}
          <div className="flex flex-col items-center">
            {/* Render a div with flex-shrink-0 to prevent shrinking */}
            <div className="flex-shrink-0">
              {/* Render the MyBadgesComp component */}
              <MyBadgesComp
                // Pass the 'name' prop with the current badge's name or an empty string if undefined
                name={currentBadge?.name || ''}
                // Pass the 'performance' prop with the current badge's performance or an empty string if undefined
                performance={currentBadge?.performance || ''}
                // Pass the 'image' prop with the current badge's image URL or an empty string if undefined
                image={currentBadge?.image || ''}
              />
            </div>
          </div>
          {/* Render a div to hold the navigation buttons */}
          <div className="flex flex-col ml-8">
            {/* Render the previous button */}
            <button onClick={handlePrevClick} className="mb-4">
              {/* Render the up arrow image */}
              <img src="/up.svg" alt="Previous Arrow" />
            </button>
            {/* Render the next button */}
            <button onClick={handleNextClick}>
              {/* Render the down arrow image */}
              <img src="/down.svg" alt="Next Arrow" />
            </button>
          </div>
        </div>
      </div>
    </PageStructure>
  );
};

// Export the MyBadges component as the default export
export default MyBadges;