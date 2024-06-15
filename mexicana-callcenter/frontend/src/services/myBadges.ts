// Import the axios library for making HTTP requests
import axios from 'axios';
// Import the conf module from the relative path '../conf'
import conf from '../conf';

// Get the base URL for the API from the configuration
const API_URL = conf.apiUrl; //'http://localhost:3000';

// Function to fetch an agent by ID
const getAgent = async (agentId: string) => {
  // Send a GET request to the server to retrieve agent data
  const response = await axios.get(`${API_URL}/agents/${agentId}`);
  // Return the response data
  return response.data;
};

// Export the getAgent function as the default export
export default {
  getAgent,
};