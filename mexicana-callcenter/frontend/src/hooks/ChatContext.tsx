import React, { createContext, useContext, ReactNode } from 'react';
import useChatProvider from '../Provider/ChatProvider';

interface ChatContextType {
  isConnected: boolean;
  members: string[];
  chatRows: string[];
  onPublicMessage: (message: string) => void;
  onPrivateMessage: (message: string, to: string) => void;
  onConnect: () => void;
  onDisconnect: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

const ChatProviderContext: React.FC<ChatProviderProps> = ({ children }) => {
  const chat = useChatProvider();

  return (
    <ChatContext.Provider value={chat}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProviderContext;
