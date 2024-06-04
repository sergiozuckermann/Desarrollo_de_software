import React from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';

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

  @media (max-width: 768px) {
    width: 100%;
    margin: 5px 0;
  }
`;

const AgentUsername = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #16a34a;
`;

const AgentName = styled.div`
  font-size: 14px;
  color: #333;
  font-style: italic;
`;

const Agent = ({ agent }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'AGENT',
    item: { id: agent.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <AgentContainer ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }} data-testid={`agent-${agent.id}`}>
      <AgentUsername>{agent.username}</AgentUsername>
      <AgentName>{agent.name} {agent.lastname}</AgentName>
    </AgentContainer>
  );
};

export default Agent;