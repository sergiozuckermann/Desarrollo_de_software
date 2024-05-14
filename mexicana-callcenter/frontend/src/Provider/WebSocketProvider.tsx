import React, { createContext, useEffect, ReactNode, Context, useState } from 'react';
import { WebSocketContextType } from '../utils/interfaces';
import { useAuth } from '../hooks/useAuth';

// Create a context with a default undefined value but cast to the desired type
export const WebSocketContext: Context<WebSocketContextType | null> = createContext<WebSocketContextType | null>(null);

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const {isAuthenticated} = useAuth()
  useEffect(() => {
    if(isAuthenticated) {
        setSocket(new WebSocket('wss://gzmcfn4hlk.execute-api.us-east-1.amazonaws.com/production/'))
    }
  }, [isAuthenticated]);

  return (
    <WebSocketContext.Provider value={{ socket }}>
      {children}
    </WebSocketContext.Provider>
  );
};


export default WebSocketProvider
