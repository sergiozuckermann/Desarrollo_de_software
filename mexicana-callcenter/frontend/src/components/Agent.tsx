// Import the useDrag hook from the react-dnd library
import { useDrag } from 'react-dnd';
// Import styled-components for creating styled components
import styled from 'styled-components';

// Define a styled component for the agent container
// It takes a prop 'isDragging' which is a boolean
const AgentContainer = styled.div<{ isDragging: boolean }>`
  display: flex; // Use flexbox layout
  flex-direction: column; // Align flex items vertically
  align-items: center; // Center align flex items horizontally
  justify-content: center; // Center align flex items vertically
  padding: 10px; // Add padding
  margin: 10px; // Add margin
  border: 1px solid #ccc; // Add a border
  border-radius: 8px; // Add border radius
  background-color: #f9f9f9; // Set background color
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Add a box shadow
  transition: background-color 0.3s ease; // Add a transition for background color

  // Add a hover effect
  &:hover {
    background-color: #f1f1f1; // Change background color on hover
  }
`;

// Define a styled component for the agent username
const AgentUsername = styled.div`
  font-size: 16px; // Set font size
  font-weight: bold; // Set font weight to bold
  color: #16a34a; // Set text color
`;

// Define a styled component for the agent name
const AgentName = styled.div`
  font-size: 14px; // Set font size
  color: #333; // Set text color
  font-style: italic; // Set font style to italic
`;

// Define the Agent component
const Agent = ({ agent }: { agent: any }) => {
  // Use the useDrag hook to make the agent component draggable
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'AGENT', // Specify the drag item type
    item: { id: agent.id }, // Specify the drag item data
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(), // Get the isDragging state from the monitor
    }),
  }));

  // Render the agent component
  return (
    <AgentContainer
      ref={drag} // Attach the drag ref to the container
      style={{ opacity: isDragging ? 0.5 : 1 }} // Adjust opacity based on isDragging state
      data-testid={`agent-${agent.id}`} // Add a test ID for testing
      isDragging // Pass the isDragging state as a prop to the styled component
    >
      <AgentUsername>{agent.username}</AgentUsername> {/* Display the agent's username */}
      <AgentName>{agent.name} {agent.lastname}</AgentName> {/* Display the agent's name and last name */}
    </AgentContainer>
  );
};

// Export the Agent component as the default export
export default Agent;