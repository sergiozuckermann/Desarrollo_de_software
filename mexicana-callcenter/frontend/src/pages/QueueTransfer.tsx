// Import the necessary React hooks
import { useEffect, useState, useRef } from 'react';
// Import the Agent component
import Agent from '../components/Agent';
// Import the CardDrop component
import CardDrop from '../components/CardDrop';
// Import the userService module
import userService from "../services/user";
// Import the PageStructure component
import PageStructure from '../components/PageStructure';
// Import the axios library for making HTTP requests
import axios from 'axios';
// Import the NotificationContainer and NotificationManager from the react-notifications library
import { NotificationContainer, NotificationManager } from 'react-notifications';
// Import the CSS styles for react-notifications
import 'react-notifications/lib/notifications.css';
// Import the styled components for AgentTransferComponents
import { CardsContainer, SearchContainer, SearchInput, SearchButton, InstructionText, AgentContainer } from '../components/AgentTransferComponents';
// Import the configuration module
import conf from '../conf';

// Get the API_URL from the configuration module or fallback to 'http://localhost:3000'
const API_URL = conf.apiUrl;//'http://localhost:3000';

// Define the AgentRoutingProfile functional component
const AgentRoutingProfile = () => {
  // Define the type for the Agent object
  type Agent = {
    id: string; // The agent's ID
    name: string; // The agent's first name
    lastname: string; // The agent's last name
    username: string; // The agent's username
    routingProfileId: string; // The agent's routing profile ID
  };

  // State to store the agents data
  const [agents, setAgents] = useState<Agent[]>([]);
  // State to track the loading state
  const [loading, setLoading] = useState(true);
  // State to store the search input values
  const [searchName, setSearchName] = useState('');
  const [searchLastName, setSearchLastName] = useState('');
  const [searchUsername, setSearchUsername] = useState('');
  // State to track if the search button has been clicked
  const [buttonClicked, setButtonClicked] = useState(false);

  // Map of routing profile IDs to their corresponding names
  const routingProfilesMap = {
    'cef57a3d-e69c-410f-a52a-511cdd89664b': 'Flight Management',
    '0de58771-443e-461c-bb5d-3999dea7dfb6': 'Website Assistance',
    '10700746-2ca6-4e5f-a882-4c274cd1e2b4': 'Customer Care',
    'ce4292ed-d0e1-46a5-a0b5-966c4315e429': 'Other Questions',
    '2d25f6a6-a8c9-4cf3-aacb-ad3338c699fc': 'Special Assistance',
    'ac2bd63f-1865-4bc6-821f-36f2dbd19ecc': 'Travel Information',
    'e2ab2ae8-dc73-490e-9147-196ad04c7e87': 'Test Profile',
  };

  // Ref to store references to the agent elements
  const agentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Function to load the agents data from the API
  const loadAgents = async () => {
    try {
      const agentsData = await userService.GetAgents(); // Call the GetAgents function from the userService module
      setAgents(agentsData); // Update the agents state with the fetched data
      setLoading(false); // Set the loading state to false
    } catch (error) {
      console.error('Error al obtener agentes:', error); // Log any errors
    }
  };

  // Load the agents data when the component mounts
  useEffect(() => {
    loadAgents();
  }, []);

  // Function to handle agent drop event
  const handleAgentDrop = async (agentId: string, newRoutingProfileId: string) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Add the authorization header with the token
        },
      };

      await axios.post(`${API_URL}/Supervisor/update-routing-profile`, // Send a POST request to update the routing profile
        { userId: agentId, routingProfileId: newRoutingProfileId }, config
      );

      setAgents((prevAgents) => {
        const movedAgent = prevAgents.find(agent => agent.id === agentId); // Find the moved agent
        if (!movedAgent) return prevAgents; // If the agent is not found, return the previous agents

        const updatedAgents = prevAgents.filter(agent => agent.id !== agentId); // Remove the moved agent from the list
        movedAgent.routingProfileId = newRoutingProfileId; // Update the routing profile ID of the moved agent
        return [...updatedAgents, movedAgent]; // Return the updated agents list
      });
      NotificationManager.success('Agent queue updated', 'Update Success'); // Show a success notification
    } catch (error) {
      NotificationManager.error('Failed to update the queue', 'Update Error'); // Show an error notification
    }
  };

  // Function to handle the search input
  const handleSearch = () => {
    setButtonClicked(true); // Mark the button as clicked
    setTimeout(() => setButtonClicked(false), 2000); // Reset after 2 seconds for visual feedback

    const agent = agents.find(agent =>
      agent.name.toLowerCase().includes(searchName.toLowerCase()) &&
      agent.lastname.toLowerCase().includes(searchLastName.toLowerCase()) &&
      agent.username === searchUsername
    );

    if (agent) {
      NotificationManager.success('User found', 'Search Success'); // Show a success notification
      const agentElement = agentRefs.current[agent.id]; // Get the reference to the agent element

      if (agentElement) {
        setTimeout(() => {
          agentElement.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Scroll to the agent element
          agentElement.classList.add('highlight'); // Add a highlight class

          setTimeout(() => {
            agentElement.classList.remove('highlight'); // Remove the highlight class after 2 seconds
          }, 2000);
        }, 100);
      }
    } else {
      NotificationManager.error('User not found', 'Search Error'); // Show an error notification
    }
  };

  // If the loading state is true, render a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // Group the agents by their routing profile ID
  const agentsByRoutingProfile: { [key: string]: any[] } = agents.reduce((acc, agent) => {
    const { routingProfileId } = agent; // Get the routing profile ID
    if (!acc[routingProfileId]) {
      acc[routingProfileId] = []; // Initialize an empty array for the routing profile ID
    }
    acc[routingProfileId].push(agent); // Add the agent to the array
    return acc;
  }, {} as { [key: string]: any[] });

  // Render the component
  return (
    <div style={{ height: '100%', overflowY: 'auto' }}>
      {/* Render an instruction text component */}
      <InstructionText>
        Drag and drop an agent according to the current Contact Center needs.
      </InstructionText>
      {/* Render a search container component */}
      <SearchContainer>
        {/* Render a search input for the agent's name */}
        <SearchInput
          type="text"
          placeholder="Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          data-cy="search-name"
        />
        {/* Render a search input for the agent's last name */}
        <SearchInput
          type="text"
          placeholder="Last Name"
          value={searchLastName}
          onChange={(e) => setSearchLastName(e.target.value)}
          data-cy="search-lastname"
        />
        {/* Render a search input for the agent's username */}
        <SearchInput
          type="text"
          placeholder="Username"
          value={searchUsername}
          onChange={(e) => setSearchUsername(e.target.value)}
          data-cy="search-username"
        />
        {/* Render a search button */}
        <SearchButton clicked={buttonClicked} onClick={handleSearch} data-cy="search-submit">
          Search
        </SearchButton>
      </SearchContainer>
      {/* Render a container for the routing profiles (cards) and agents */}
      <CardsContainer>
        {/* Map over the routing profile IDs and render a CardDrop component for each */}
        {Object.keys(routingProfilesMap).map((routingProfileId) => (
          <CardDrop
            key={routingProfileId}
            profileName={routingProfilesMap[routingProfileId as keyof typeof routingProfilesMap]}
            routingProfileId={routingProfileId}
            onAgentDrop={handleAgentDrop}
          >
            {/* Map over the agents belonging to the current routing profile and render them */}
            {(agentsByRoutingProfile[routingProfileId] || []).map((agent: Agent) => (
              <AgentContainer
                key={agent.id}
                ref={el => agentRefs.current[agent.id] = el}
              >
                <Agent key={agent.id} agent={agent} />
              </AgentContainer>
            ))}
          </CardDrop>
        ))}
      </CardsContainer>
      {/* Render a notification container */}
      <NotificationContainer />
    </div>
  );
};

// Define the AgentRoutingProfilePage component
const AgentRoutingProfilePage = () => {
  return (
    <PageStructure title="Queue Transfer">
      <AgentRoutingProfile />
    </PageStructure>
  );
};

// Export the AgentRoutingProfilePage component as the default export
export default AgentRoutingProfilePage;