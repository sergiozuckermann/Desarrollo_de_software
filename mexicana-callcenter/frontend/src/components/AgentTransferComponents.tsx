import styled from 'styled-components';

// Styled components
const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  width: 100%;
  max-width: 100%; // Ensure the container doesn't exceed the screen width
  margin: 0 auto; // Center the container
  padding: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const SearchContainer = styled.div`
  margin: 20px 0;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

const SearchInput = styled.input`
  padding: 10px;
  width: 10em;
  font-size: 25px;
  border: 3px solid #ccc;
  border-radius: 5px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchButton = styled.button<{ clicked: boolean }>`
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${props => props.clicked ? 'green' : 'blue'};
  color: white;
  border: 3px solid  ${props => props.clicked ? 'green' : '#007BFF'};
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.clicked ? 'darkgreen' : '#0056b3'};
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`;

const InstructionText = styled.div`
  text-align: center;
  margin: 20px 0;
  font-size: 25px;
  font-weight: bold;
  color: #808080;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const AgentContainer = styled.div`
  &.highlight {
    background-color: #d6d6d6;
    transition: background-color 0.3s ease;
    border-radius: 8px;
  }
`;

export {
  CardsContainer,
  SearchContainer,
  SearchInput,
  SearchButton,
  InstructionText,
  AgentContainer
};