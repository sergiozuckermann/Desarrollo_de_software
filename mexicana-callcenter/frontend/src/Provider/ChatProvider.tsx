// Code that provides chat functionality using WebSockets

import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';

// Websocket URL
const URL = 'wss://8qombs74rl.execute-api.us-east-1.amazonaws.com/production/';

// Define the MessageData interface
interface MessageData {
  members?: string[];
  publicMessage?: string;
  privateMessage?: string;
  systemMessage?: string;
}
// Custom hook that provides chat functionality using WebSockets
const useChatProvider = () => {
  const socket = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [members, setMembers] = useState<string[]>([]);
  const [publicMessages, setPublicMessages] = useState<string[]>([]);
  const [privateMessages, setPrivateMessages] = useState<{ [key: string]: string[] }>({});
  const { username } = useAuth();

  // Handler for WebSocket open event
  const onSocketOpen = useCallback(() => {
    setIsConnected(true);
    socket.current?.send(JSON.stringify({ action: 'setName', name: username }));
  }, [username]);

  // Handler for WebSocket close event
  const onSocketClose = useCallback(() => {
    setMembers([]);
    setIsConnected(false);
    setPublicMessages([]);
    setPrivateMessages({});
  }, []);

  // Handler for WebSocket message event
  const onSocketMessage = useCallback((dataStr: string) => {
    const data: MessageData = JSON.parse(dataStr);

    // Check the type of message and update the state accordingly
    if (data.members) {
        setMembers(data.members); // Update members list
    } else if (data.publicMessage && typeof data.publicMessage === 'string') {
        setPublicMessages(oldArray => [...oldArray, data.publicMessage].filter((msg): msg is string => !!msg));
    } else if (data.privateMessage && typeof data.privateMessage === 'string') {
        const [from, ...messageParts] = data.privateMessage.split(': ');
        const message = messageParts.join(': '); // Ensure message is fully reconstructed
        if (from && message) {
            setPrivateMessages(oldPrivateMessages => {
                const newPrivateMessages = { ...oldPrivateMessages };
                if (!newPrivateMessages[from]) {
                    newPrivateMessages[from] = [];
                }
                newPrivateMessages[from].push(`${from}: ${message}`);
                return newPrivateMessages;
            });
        }
    } else if (data.systemMessage && typeof data.systemMessage === 'string') {
        setPublicMessages(oldArray => [...oldArray, `system: ${data.systemMessage}`].filter((msg): msg is string => !!msg));
    }
  }, []);

  // Handler for connecting to the WebSocket
  const onConnect = useCallback(() => {
    if (socket.current?.readyState !== WebSocket.OPEN) {
      socket.current = new WebSocket(URL);
      socket.current.addEventListener('open', onSocketOpen);
      socket.current.addEventListener('close', onSocketClose);
      socket.current.addEventListener('message', (event) => {
        onSocketMessage(event.data);
      });
    }
  }, [onSocketOpen, onSocketClose, onSocketMessage]);

  // Cleanup function to close the WebSocket connection
  useEffect(() => {
    return () => {
      socket.current?.close();
    };
  }, []);

  // Handler for sending a private message
  const onSendPrivateMessage = useCallback((message: string, to: string) => {
    if (message.trim()) {
        socket.current?.send(JSON.stringify({
            action: 'sendPrivate',
            message,
            to,
        }));
        setPrivateMessages(oldPrivateMessages => {
            const newPrivateMessages = { ...oldPrivateMessages };
            if (!newPrivateMessages[to]) {
                newPrivateMessages[to] = [];
            }
            newPrivateMessages[to].push(`You: ${message}`);
            return newPrivateMessages;
        });
    }
  }, []);

  // Handler for sending a public message
  const onSendPublicMessage = useCallback((message: string) => {
    if (message.trim()) {
        socket.current?.send(JSON.stringify({
            action: 'sendPublic',
            message,
        }));
        setPublicMessages(oldArray => [...oldArray, message].filter((msg): msg is string => !!msg));
    }
  }, []);

  // Destructure the 'logout' function from the 'useAuth' hook
  const { logout } = useAuth();


  // Disconnect from WebSocket server and logout
  const onDisconnect = useCallback(() => {
    if (isConnected) {
      socket.current?.close();
      logout();
    }
  }, [isConnected, logout]);

  // Return chat-related states and functions
  return {
    isConnected,
    members,
    publicMessages,
    privateMessages,
    onPublicMessage: onSendPublicMessage,
    onPrivateMessage: onSendPrivateMessage,
    onConnect,
    onDisconnect,
  };
};

export default useChatProvider;