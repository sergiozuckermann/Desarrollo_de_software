// Import the useDrop hook from the react-dnd library
import { useDrop } from 'react-dnd';
// Import the styled-components library for creating styled components
import styled from 'styled-components';

// Define a styled component for the card container
const CardContainer = styled.div`
  width: 100%;
  max-width: 13em; // Set a maximum width of 13em
  height: 23em; // Set a fixed height of 23em
  background-color: rgba(255, 255, 255, 0.9); // Set a semi-transparent white background
  padding: 1em; // Add padding
  margin: 1em; // Add margin
  border: 1px solid #ccc; // Add a border
  border-radius: 8px; // Add border radius
  display: flex; // Use flexbox layout
  flex-direction: column; // Stack flex items vertically
  align-items: center; // Center align flex items horizontally
  position: relative; // Set position to relative
  overflow: hidden; // Hide overflowing content
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Add a box shadow
  transition: background-color 0.2s; // Add a transition for background color

  &.isOver { // Apply styles when the card is being hovered over
    background-color: lightgreen; // Change the background color
  }

  @media (max-width: 768px) { // Media query for smaller screens
    width: 100%; // Set the width to 100%
    margin: 5px 0; // Adjust the margin
  }
`;

// Define a styled component for the card title
const CardTitle = styled.h3`
  margin-bottom: 10px; // Add bottom margin
  text-align: center; // Center align the text
  position: sticky; // Make the title sticky
  top: 0; // Stick the title to the top
  background: rgba(255, 255, 255, 0.9); // Set a semi-transparent white background
  width: 100%; // Set the width to 100%
  padding: 0.5em 0; // Add padding
  border-bottom: 1px solid #ccc; // Add a bottom border
  z-index: 1; // Set a higher z-index
  font-size: 1.2em; // Set the font size
  font-weight: bold; // Set the font weight to bold
  color: #333; // Set the text color
  border-top-left-radius: 8px; // Add a border radius to the top-left corner
  border-top-right-radius: 8px; // Add a border radius to the top-right corner
`;

// Define a styled component for the agents container
const AgentsContainer = styled.div`
  display: flex; // Use flexbox layout
  flex-direction: column; // Stack flex items vertically
  align-items: center; // Center align flex items horizontally
  width: 100%; // Set the width to 100%
  height: calc(100% - 40px); // Set the height to fill the remaining space (subtracting 40px)
  overflow-y: auto; // Enable vertical scrolling when content overflows

  &::-webkit-scrollbar { // Style the scrollbar for WebKit-based browsers
    width: 8px; // Set the scrollbar width
  }

  &::-webkit-scrollbar-track { // Style the scrollbar track
    background: transparent; // Set a transparent background
  }

  &::-webkit-scrollbar-thumb { // Style the scrollbar thumb
    background-color: rgba(0, 0, 0, 0.3); // Set a semi-transparent black background
    border-radius: 4px; // Add a border radius
  }

  &:after { // Add a pseudo-element after the container
    content: ""; // Set an empty content
    position: absolute; // Set position to absolute
    bottom: 0; // Align the element to the bottom
    left: 0; // Align the element to the left
    right: 0; // Align the element to the right
    height: 20px; // Set the height to 20px
    background: linear-gradient(to top, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0)); // Set a gradient background
    z-index: 1; // Set a higher z-index
  }
`;

// Define the CardDrop component
const CardDrop = ({ profileName, routingProfileId, onAgentDrop, children }: { profileName: string, routingProfileId: string, onAgentDrop: any, children: any }) => {
  // Use the useDrop hook from react-dnd
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'AGENT', // Accept items with the type 'AGENT'
    drop: (item: any) => { // Add type assertion here
      onAgentDrop(item.id, routingProfileId); // Call the onAgentDrop function with the item ID and routing profile ID
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(), // Check if the card is being hovered over
    }),
  }));

  return (
    // Render the card container
    <CardContainer ref={drop} className={isOver ? 'isOver' : ''} data-testid={`card-${profileName.replace(/\s+/g, '')}`}>
      {/* Render the card title */}
      <CardTitle>{profileName}</CardTitle>
      {/* Render the agents container */}
      <AgentsContainer>
        {/* Render the children components */}
        {children}
      </AgentsContainer>
    </CardContainer>
  );
};

// Export the CardDrop component as the default export
export default CardDrop;