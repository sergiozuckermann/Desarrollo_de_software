import React, { useEffect, useState, useRef } from 'react';
import Agent from '../components/AgentDrag';
import CardDrop from '../components/CardDrop';
import userService from "../services/user";
import PageStructure from '../components/PageStructure';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { CardsContainer, SearchContainer, SearchInput, SearchButton, InstructionText, AgentContainer } from '../components/AgentTransferComponents';


const AgentRoutingProfile = () => {
  type Agent = {
    id: string;
    name: string;
    lastname: string;
    username: string;
    routingProfileId: string;
  };

  const [agents, setAgents] = useState<Agent[]>([]); // State to store the agents
  const [loading, setLoading] = useState(true); // State to store the loading status
  const [searchName, setSearchName] = useState(''); // State to store the name
  const [searchLastName, setSearchLastName] = useState(''); // State to store the last name
  const [searchUsername, setSearchUsername] = useState(''); // State to store the username
  const [buttonClicked, setButtonClicked] = useState(false); // State to store the button clicked status
 


  const routingProfilesMap = { // Map of routing profiles
    'cef57a3d-e69c-410f-a52a-511cdd89664b': 'Flight Management',
    '0de58771-443e-461c-bb5d-3999dea7dfb6': 'Website Assistance',
    '10700746-2ca6-4e5f-a882-4c274cd1e2b4': 'Customer Care',
    'ce4292ed-d0e1-46a5-a0b5-966c4315e429': 'Other Questions',
    '2d25f6a6-a8c9-4cf3-aacb-ad3338c699fc': 'Special Assistance',
    'ac2bd63f-1865-4bc6-821f-36f2dbd19ecc': 'Travel Information',
    'e2ab2ae8-dc73-490e-9147-196ad04c7e87': 'Test Profile',
  };

  const agentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({}); // Create a ref to store the agent elements

  const loadAgents = async () => { // Function to load the agents
    try {
      const agentsData = await userService.GetAgents();
      setAgents(agentsData);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener agentes:', error);
    }
  };

  useEffect(() => { // Effect to update the agentRefs when the agents change
    loadAgents();
  }, []);

  const handleAgentDrop = async (agentId: string, newRoutingProfileId: string) => {

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      };

      await axios.post('http://localhost:3000/Supervisor/update-routing-profile',
        { userId: agentId, routingProfileId: newRoutingProfileId }, config
      );

      // Update the agents state
      setAgents((prevAgents) => {
        // Find the moved agent
        const movedAgent = prevAgents.find(agent => agent.id === agentId);
        if (!movedAgent) return prevAgents; // If the agent is not found, do nothing

        // Delete the moved agent from the previous routing profile
        const updatedAgents = prevAgents.filter(agent => agent.id !== agentId);

        // Update the routing profile of the moved agent
        movedAgent.routingProfileId = newRoutingProfileId;

        // Add the moved agent to the new routing profile
        return [...updatedAgents, movedAgent];
      });
      NotificationManager.success('Agent queue updated', 'Update Success');

    } catch (error) {
      // console.error('Error al actualizar el perfil de enrutamiento:', error);
      NotificationManager.error('Failed to update the queue', 'Update Error');
    }
  };

  const handleSearch = () => {
    const agent = agents.find(agent =>
      agent.name.toLowerCase().includes(searchName.toLowerCase()) &&
      agent.lastname.toLowerCase().includes(searchLastName.toLowerCase()) &&
      agent.username === searchUsername
    );
  
    if (agent) {
      NotificationManager.success('User found', 'Search Success');
      const agentElement = agentRefs.current[agent.id];
  
      if (agentElement) {
        setTimeout(() => {
          agentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          agentElement.classList.add('highlight');
  
          // Remove highlight after 2 seconds
          setTimeout(() => {
            agentElement.classList.remove('highlight');
          }, 2000);
        }, 100); // Add a small delay to ensure DOM update
      }
    } else {
      NotificationManager.error('User not found', 'Search Error');
    }
  };



  if (loading) {
    return <div>Loading...</div>;
  }

  // Group agents by routing profile
  const agentsByRoutingProfile: {[key: string]: any[]} = agents.reduce((acc, agent) => {
    const { routingProfileId } = agent;
    if (!acc[routingProfileId]) {
      acc[routingProfileId] = [];
    }
    acc[routingProfileId].push(agent);
    return acc;
  }, {});

  return (
    <div>
       <InstructionText>
        Drag and drop an agent according to the current Contact Center needs.
      </InstructionText>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <SearchInput
          type="text"
          placeholder="Last Name"
          value={searchLastName}
          onChange={(e) => setSearchLastName(e.target.value)}
        />
        <SearchInput
          type="text"
          placeholder="Username"
          value={searchUsername}
          onChange={(e) => setSearchUsername(e.target.value)}
        />
        <SearchButton clicked={buttonClicked} onClick={handleSearch}>
          Search
        </SearchButton>
      </SearchContainer>
      <CardsContainer>
        {Object.keys(routingProfilesMap).map((routingProfileId) => (
          <CardDrop
            key={routingProfileId}
            profileName={routingProfilesMap[routingProfileId]}
            routingProfileId={routingProfileId}
            onAgentDrop={handleAgentDrop}
          >
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
      <NotificationContainer />
    </div>
  );
};

const AgentRoutingProfilePage = () => {
  return (
    <PageStructure title="Queue Transfer">
      <AgentRoutingProfile />
    </PageStructure>
  );
};

export default AgentRoutingProfilePage;
