// agentService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Function to fetch all agents from the backend API
const getAllAgents = async () => {
    const response = await axios.get(`${API_URL}/agents`);
    return response.data;
  };
  
  export default {
    getAllAgents,
  };