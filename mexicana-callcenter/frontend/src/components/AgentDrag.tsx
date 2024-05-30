import React from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';

// Agent Container Styles
const AgentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f1f1f1;
  }

  opacity: ${(props) => (props.isdragging ? 0.5 : 1)};
`;

// Agent Name Styles
const AgentUsername = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

// Aget Username Styles
const AgentName = styled.div`
  font-size: 14px;
  color: #20253f;
`;

// Agent Type
const AgentType = styled.div`
  font-size: 14px;
  color: #16a34a;
  font-style: italic;
`;

const securityProfilesMap = {
  '27178b20-0435-4bfa-8962-803d8fa01b95': 'Supervisor',
  '6853576e-8cb9-49d9-8d2f-9e6e36a6c003': 'Agent',
  '9c183cea-9741-4bf6-a745-e235dbdd3973': 'Admin'
};


const Agent = ({ agent }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'AGENT',
    item: { id: agent.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Map securityProfileId to agent type
  const agentType = securityProfilesMap[agent.type] || 'Unknown';

  return (
    <AgentContainer ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }} data-testid={`agent-${agent.id}`}>
      <AgentUsername>{agent.username}</AgentUsername>
      <AgentName>{agent.name}</AgentName>
      <AgentType>{agentType}</AgentType>
    </AgentContainer>
  );
};

export default Agent;
