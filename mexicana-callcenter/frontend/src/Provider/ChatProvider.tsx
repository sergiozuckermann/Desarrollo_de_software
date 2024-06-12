import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';

const URL = 'wss://8qombs74rl.execute-api.us-east-1.amazonaws.com/production/';

interface MessageData {
  members?: string[];
  publicMessage?: string;
  privateMessage?: string;
  systemMessage?: string;
}

const useChatProvider = () => {
  const socket = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [members, setMembers] = useState<string[]>([]);
  const [publicMessages, setPublicMessages] = useState<string[]>([]);
  const [privateMessages, setPrivateMessages] = useState<{ [key: string]: string[] }>({});
  const { username } = useAuth();

  const onSocketOpen = useCallback(() => {
    setIsConnected(true);
    socket.current?.send(JSON.stringify({ action: 'setName', name: username }));
  }, [username]);

  const onSocketClose = useCallback(() => {
    setMembers([]);
    setIsConnected(false);
    setPublicMessages([]);
    setPrivateMessages({});
  }, []);

  const onSocketMessage = useCallback((dataStr: string) => {
    const data: MessageData = JSON.parse(dataStr);
    if (data.members) {
        setMembers(data.members);
    } else if (data.publicMessage && typeof data.publicMessage === 'string') {
        setPublicMessages(oldArray => [...oldArray, data.publicMessage || ""]);
    } else if (data.privateMessage && typeof data.privateMessage === 'string') {
        const [from, message] = data.privateMessage.split(': ');
        setPrivateMessages(oldPrivateMessages => {
            const newPrivateMessages = { ...oldPrivateMessages };
            if (!newPrivateMessages[from]) {
                newPrivateMessages[from] = [];
            }
            newPrivateMessages[from].push(`${from}: ${message}`);
            return newPrivateMessages;
        });
    } else if (data.systemMessage && typeof data.systemMessage === 'string') {
        setPublicMessages(oldArray => [...oldArray, `system: ${data.systemMessage}`]);
    }
}, []);

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

  useEffect(() => {
    return () => {
      socket.current?.close();
    };
  }, []);

  const onSendPrivateMessage = useCallback((message: string, to: string) => {
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
  }, []);

  const onSendPublicMessage = useCallback((message: string) => {
    socket.current?.send(JSON.stringify({
      action: 'sendPublic',
      message,
    }));
  }, []);

  const { logout } = useAuth();

  const onDisconnect = useCallback(() => {
    if (isConnected) {
      socket.current?.close();
      logout();
    }
  }, [isConnected, logout]);

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