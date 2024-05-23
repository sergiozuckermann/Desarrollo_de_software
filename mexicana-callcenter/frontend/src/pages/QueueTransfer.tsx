import React, { useEffect, useState } from 'react';
import Agent from '../components/AgentDrag';
import CardDrag from '../components/CardDrop';
import userService from "../services/user";
import styled from 'styled-components';
import PageStructure from '../components/PageStructure';
import axios from 'axios';

// Styled components
const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

const AgentRoutingProfile = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  const routingProfilesMap = {
    'cef57a3d-e69c-410f-a52a-511cdd89664b': 'Flight Management',
    '0de58771-443e-461c-bb5d-3999dea7dfb6': 'Website Assistance',
    '10700746-2ca6-4e5f-a882-4c274cd1e2b4': 'Customer Care',
    'ce4292ed-d0e1-46a5-a0b5-966c4315e429': 'Other Questions',
    '2d25f6a6-a8c9-4cf3-aacb-ad3338c699fc': 'Special Assistance',
    'ac2bd63f-1865-4bc6-821f-36f2dbd19ecc': 'Travel Information',
    'e2ab2ae8-dc73-490e-9147-196ad04c7e87': 'Test Profile',
    '91d0f15f-3020-4ecb-bf54-6e5f50b85137': 'Supervisor',
    '13a54127-9cff-44e8-804f-689c05089faf': 'Basic Routing Profile',
  };

  useEffect(() => {
    const loadAgents = async () => {
      try {
        const agentsData = await userService.GetAgents();
        setAgents(agentsData);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener agentes:', error);
      }
    };

    loadAgents();
  }, []);

  const handleAgentDrop = async (agentId, newRoutingProfileId) => {
    try {
      const config = { // set headers
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      await axios.post('http://localhost:3000/Supervisor/update-routing-profile',
        { userId: agentId, routingProfileId: newRoutingProfileId }, config
      );

    } catch (error) {
      console.error('Error al actualizar el perfil de enrutamiento:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Group Agents by Routing Profile
  const agentsByRoutingProfile = agents.reduce((acc, agent) => {
    const { routingProfileId } = agent;
    if (!acc[routingProfileId]) {
      acc[routingProfileId] = [];
    }
    acc[routingProfileId].push(agent);
    return acc;
  }, {});

  return (
    <div>
      <CardsContainer>
        {Object.keys(routingProfilesMap).map((routingProfileId) => (
          <CardDrag
            key={routingProfileId}
            profileName={routingProfilesMap[routingProfileId]}
            routingProfileId={routingProfileId}
            onAgentDrop={handleAgentDrop}
          >
            {(agentsByRoutingProfile[routingProfileId] || []).map((agent) => (
              <Agent key={agent.id} agent={agent} />
            ))}
          </CardDrag>
        ))}
      </CardsContainer>
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
