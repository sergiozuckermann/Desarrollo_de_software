// Import the styled-components library
import styled from 'styled-components';

// Styled component for a container to hold a group of cards
const CardsContainer = styled.div`
  display: flex; // Use flexbox layout
  flex-wrap: wrap; // Allow flex items to wrap to the next line
  justify-content: center; // Center the flex items horizontally
  gap: 10px; // Add a gap between flex items
  width: 100%; // Set the width to 100%
  max-width: 100%; // Ensure the container doesn't exceed the screen width
  margin: 0 auto; // Center the container horizontally
  padding: 10px; // Add some padding

  // Media query for smaller screens (max-width: 768px)
  @media (max-width: 768px) {
    flex-direction: column; // Stack flex items vertically
    align-items: center; // Center the flex items horizontally
  }
`;

// Styled component for a container to hold a search input and button
const SearchContainer = styled.div`
  margin: 20px 0; // Add margin top and bottom
  text-align: center; // Center the text horizontally
  display: flex; // Use flexbox layout
  flex-wrap: wrap; // Allow flex items to wrap to the next line
  justify-content: center; // Center the flex items horizontally
  gap: 10px; // Add a gap between flex items
`;

// Styled component for the search input field
const SearchInput = styled.input`
  padding: 10px; // Add padding
  width: 10em; // Set a fixed width
  font-size: 25px; // Set the font size
  border: 3px solid #ccc; // Add a border
  border-radius: 5px; // Add border radius

  // Media query for smaller screens (max-width: 768px)
  @media (max-width: 768px) {
    width: 100%; // Set the width to 100% on smaller screens
  }
`;

// Styled component for the search button
const SearchButton = styled.button<{ clicked: boolean }>`
  padding: 10px 20px; // Add padding
  font-size: 16px; // Set the font size
  background-color: ${props => props.clicked ? 'green' : 'blue'}; // Set the background color based on the 'clicked' prop
  color: white; // Set the text color to white
  border: 3px solid ${props => props.clicked ? 'green' : '#007BFF'}; // Set the border color based on the 'clicked' prop
  border-radius: 5px; // Add border radius
  cursor: pointer; // Change the cursor to a pointer on hover
  transition: background-color 0.3s; // Add a smooth transition for background color

  &:hover {
    background-color: ${props => props.clicked ? 'darkgreen' : '#0056b3'}; // Change the background color on hover based on the 'clicked' prop
  }

  // Media query for smaller screens (max-width: 768px)
  @media (max-width: 768px) {
    width: 100%; // Set the width to 100% on smaller screens
    padding: 10px; // Reduce padding on smaller screens
  }
`;

// Styled component for an instruction text
const InstructionText = styled.div`
  text-align: center; // Center the text horizontally
  margin: 20px 0; // Add margin top and bottom
  font-size: 25px; // Set the font size
  font-weight: bold; // Set the font weight to bold
  color: #808080; // Set the text color

  // Media query for smaller screens (max-width: 768px)
  @media (max-width: 768px) {
    font-size: 16px; // Reduce the font size on smaller screens
  }
`;

// Styled component for an agent container
const AgentContainer = styled.div`
  &.highlight {
    background-color: #d6d6d6; // Set the background color for the highlight class
    transition: background-color 0.3s ease; // Add a smooth transition for background color
    border-radius: 8px; // Add border radius
  }
`;

// Export the styled components
export {
  CardsContainer,
  SearchContainer,
  SearchInput,
  SearchButton,
  InstructionText,
  AgentContainer
};