import styled from 'styled-components';

// Styled components
const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  width: calc(4 * (250px + 10px)); // Width of 4 cards plus gaps
  margin: 0 auto; // Center the container
`;

const SearchContainer = styled.div`
  margin: 20px 0;
  text-align: center;
`;

const SearchInput = styled.input`
  padding: 10px;
  width: 10em;
  font-size: 16px;
  border: 3px solid #ccc;
  border-radius: 5px;
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
`;

const InstructionText = styled.div`
  text-align: center;
  margin: 20px 0;
  font-size: 18px;
  font-weight: bold;
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
