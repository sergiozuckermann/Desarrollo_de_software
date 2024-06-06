import axios from 'axios';

const API_URL = 'http://localhost:3000';

const getAgent = async (agentId: string) => {
  const response = await axios.get(`${API_URL}/agents/${agentId}`);
  return response.data;
};

export default {
  getAgent,
};