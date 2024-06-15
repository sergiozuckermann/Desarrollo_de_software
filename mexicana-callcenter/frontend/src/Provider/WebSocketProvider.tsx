// Code that sets up a WebSocket connection for authenticated users with the 'Supervisor' role
// and provides this connection to child components via a React context.

import React, { createContext, useEffect, ReactNode, Context, useState } from 'react';
import { WebSocketContextType } from '../utils/interfaces';
import { useAuth } from '../hooks/useAuth';

// Create a context with a default undefined value but cast to the desired type
export const WebSocketContext: Context<WebSocketContextType | null> = createContext<WebSocketContextType | null>(null);

// Define the WebSocketProviderProps interface and its children prop (ReactNode)
interface WebSocketProviderProps {
  children: ReactNode;
}

// WebSocketProvider component to provide WebSocket context to its children
export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null)  // State to hold WebSocket instance
  const {isAuthenticated, role} = useAuth() // Get authentication and role information from custom hook
  useEffect(() => {
     // Establish WebSocket connection if the user is authenticated and is a Supervisor
    if(isAuthenticated && role == 'Supervisor') {
        setSocket(new WebSocket('wss://305odlxyc3.execute-api.us-east-1.amazonaws.com/production/'))
    }
  }, [isAuthenticated, role]);  // Effect depends on isAuthenticated and role

  return (
     // Provide the WebSocket instance to children via context
    <WebSocketContext.Provider value={{ socket }}>
      {children} 
    </WebSocketContext.Provider>
  );
};


export default WebSocketProvider
