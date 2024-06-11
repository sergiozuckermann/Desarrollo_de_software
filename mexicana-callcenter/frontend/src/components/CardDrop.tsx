import { useDrop } from 'react-dnd';
import styled from 'styled-components';

const CardContainer = styled.div`
  width: 100%;
  max-width: 13em;
  height: 23em;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 1em;
  margin: 1em;
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;

  &.isOver {
    background-color: lightgreen;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 5px 0;
  }
`;

const CardTitle = styled.h3`
  margin-bottom: 10px;
  text-align: center;
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.9);
  width: 100%;
  padding: 0.5em 0;
  border-bottom: 1px solid #ccc;
  z-index: 1;
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const AgentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100% - 40px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(to top, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0));
    z-index: 1;
  }
`;

const CardDrop = ({ profileName, routingProfileId, onAgentDrop, children }: {profileName:string, routingProfileId:string, onAgentDrop:any, children:any}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'AGENT',
    drop: (item: any) => { // Add type assertion here
      onAgentDrop(item.id, routingProfileId);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <CardContainer ref={drop} className={isOver ? 'isOver' : ''} data-testid={`card-${profileName.replace(/\s+/g, '')}`}>
      <CardTitle>{profileName}</CardTitle>
      <AgentsContainer>
        {children}
      </AgentsContainer>
    </CardContainer>
  );
};

export default CardDrop;