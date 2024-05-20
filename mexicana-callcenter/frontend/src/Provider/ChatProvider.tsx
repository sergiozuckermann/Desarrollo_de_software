import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../hooks/useAuth'; // Importa el hook useAuth

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
  const [chatRows, setChatRows] = useState<string[]>([]);
  const { username } = useAuth(); // Obtener el nombre de usuario desde useAuth

  const onSocketOpen = useCallback(() => {
    setIsConnected(true);
    socket.current?.send(JSON.stringify({ action: 'setName', name: username })); // Enviar el nombre de usuario al abrir la conexión
  }, [username]);

  const onSocketClose = useCallback(() => {
    setMembers([]);
    setIsConnected(false);
    setChatRows([]);
  }, []);

  const onSocketMessage = useCallback((dataStr: string) => {
    const data: MessageData = JSON.parse(dataStr);
    if (data.members) {
      setMembers(data.members);
    } else if (data.publicMessage && typeof data.publicMessage === 'string') {
      setChatRows(oldArray => [...oldArray, data.publicMessage || '']);
    } else if (data.privateMessage) {
      alert(data.privateMessage);
    } else if (data.systemMessage && typeof data.systemMessage === 'string') {
      setChatRows(oldArray => [...oldArray, data.systemMessage || '']);
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

  const onSendPrivateMessage = useCallback((to: string) => {
    const message = prompt('Enter private message for ' + to);
    socket.current?.send(JSON.stringify({
      action: 'sendPrivate',
      message,
      to,
    }));
  }, []);

  const onSendPublicMessage = useCallback(() => {
    const message = prompt('Enter public message');
    socket.current?.send(JSON.stringify({
      action: 'sendPublic',
      message,
    }));
  }, []);

  // const onDisconnect = useCallback(() => {
  //   if (isConnected) {
  //     socket.current?.close();
  //   }
  // }, [isConnected]);

  const { logout } = useAuth(); // Obtener la función logout desde el contexto de autenticación

  const onDisconnect = useCallback(() => {
    if (isConnected) {
      socket.current?.close();
      logout(); // Llamar a la función logout al desconectarse
    }
  }, [isConnected, logout]);

  return {
    isConnected,
    members,
    chatRows,
    onPublicMessage: onSendPublicMessage,
    onPrivateMessage: onSendPrivateMessage,
    onConnect,
    onDisconnect,
  };
};

export default useChatProvider;
