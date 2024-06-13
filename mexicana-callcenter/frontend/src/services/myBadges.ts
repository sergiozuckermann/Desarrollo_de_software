import axios from 'axios';
import conf from '../conf';
const API_URL = conf.apiUrl;//'http://localhost:3000';


const getAgent = async (agentId: string) => {
  const response = await axios.get(`${API_URL}/agents/${agentId}`);
  return response.data;
};

export default {
  getAgent,
};