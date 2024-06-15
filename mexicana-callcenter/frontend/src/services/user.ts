// Import the axios library for making HTTP requests
import axios from 'axios';
// Import the conf module from the relative path '../conf'
import conf from '../conf';
// Get the base URL for the API from the configuration
const baseUrl = conf.apiUrl; //'http://localhost:3000';

// Function to get user information
const GetInfo = (userRole: string, username: string) => {
  const config = { // set headers
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Include JWT token in the Authorization header
    }
  };
  return axios // Make an Axios GET request
    .get(`${baseUrl}/${userRole}/myInfo/${username}`, config) // URL path includes userRole and username
    .then(response => response.data); // Return the response data
};

// Function to get a list of agents
const GetAgents = () => {
  const config = { // set headers
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Include JWT token in the Authorization header
    }
  };
  return axios // Make an Axios GET request
    .get(`${baseUrl}/Supervisor/agents`, config) // URL path to get agents
    .then(response => response.data); // Return the response data
};

// Function to get queue metrics
const GetQueueMetrics = () => {
  const config = { // set headers
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Include JWT token in the Authorization header
    }
  };
  return axios // Make an Axios GET request
    .get(`${baseUrl}/Supervisor/metrics`, config) // URL path to get queue metrics
    .then(response => response.data); // Return the response data
};

// Function to get performance metrics
const GetPerformanceMetrics = (type: string) => { // Average case resolution time (ACRT), Average customer hold time (ACHT), Average interaction time (AIT)
  console.log(type); // Log the type of performance metric
  const config = { // set headers
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Include JWT token in the Authorization header
    }
  };
  const body = { // Request body
    type: type
  };
  return axios // Make an Axios POST request
    .post(`${baseUrl}/Supervisor/metrics/performance`, body, config) // URL path to get performance metrics, pass body and config
    .then(response => response.data); // Return the response data
};

// Function to get the URL of an image associated with a username
const GetImageUrl = (username: string) => {
  const config = { // set headers
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Include JWT token in the Authorization header
    }
  };
  return axios // Make an Axios GET request
    .get(`${baseUrl}/get-image/get-image-url/${username}`, config) // URL path to get image URL for the given username
    .then(response => {
      console.log('Image URL:', response.data.imageUrl); // Log the retrieved image URL
      return response.data; // Return the response data
    })
    .catch((error) => {
      console.error('Failed to fetch image:', error); // Log an error if the request fails
      // Return the path to the default image
      return { imageUrl: '/avatar.png' };
    });
};

// Export all functions as properties of an object
export default {
  GetInfo,
  GetAgents,
  GetQueueMetrics,
  GetPerformanceMetrics,
  GetImageUrl
};