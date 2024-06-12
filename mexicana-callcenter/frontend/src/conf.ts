interface conf {
    apiUrl: string;
  }
  
// src/config.ts
const conf = {
  apiUrl: import.meta.env.VITE_API_URL || 'https://35cvz41ho8.execute-api.us-east-1.amazonaws.com/pro',
  };
  
  export default conf;
  
  