// This code defines and exports a configuration object for the application, 
// specifically setting the API URL. The API URL is configurable via an environment 
// variable, with a fallback to a default URL if the environment variable is not set.

// Interface defining the shape of the configuration object
interface conf {
  apiUrl: string;
}

// src/config.ts
// Set apiUrl to the value of the environment variable VITE_API_URL if it exists,
// otherwise fallback to the default URL
const conf = {
apiUrl: import.meta.env.VITE_API_URL || 'https://35cvz41ho8.execute-api.us-east-1.amazonaws.com/pro',
};

export default conf;
