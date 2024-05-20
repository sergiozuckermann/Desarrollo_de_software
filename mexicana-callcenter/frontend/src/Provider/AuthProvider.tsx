import axios from "axios";
import { createContext, FunctionComponent, PropsWithChildren, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextType, Credentials } from "../utils/interfaces";
import useCustomToast from "../components/LoginNotification";
import React from 'react';

const baseUrl = 'http://localhost:3000'

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { showError } = useCustomToast();
  const { showSuccess } = useCustomToast();
  const navigate = useNavigate();
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const [members, setMembers] = useState<string[]>([]);
  const [chatRows, setChatRows] = useState<React.ReactNode[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const getContext = () => {
    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;

    if(userData) {
      const { name, username, role, authenticated } = userData;
      return {
        isAuthenticated: authenticated,
        name,
        username,
        role, 
        login,
        logout,
        websocket,
        members,
        chatRows,
        isConnected,
        sendMessage,
        connectWebSocket,
        disconnectWebSocket
      };
    }

    return {
      isAuthenticated: false,
      name: null,
      username: null,
      role: null,
      login,
      logout,
      websocket,
      members,
      chatRows,
      isConnected,
      sendMessage,
      connectWebSocket,
      disconnectWebSocket
    };
  };

  const login = async (credentials: Credentials) => {
    return axios
      .post(`${baseUrl}/auth/login`, credentials)
      .then(res => {
        if(res.status === 200) {
          const { token, name, username, role } = res.data;

          const userData = {
            role,
            name, 
            username,
            authenticated: true
          };

          localStorage.setItem('userData', JSON.stringify(userData));
          localStorage.setItem('token', token);

          connectWebSocket(username);

          showSuccess(`🎉 Welcome ${name}!\nYou are now signed in.`);
          navigate(`/${role}/home`)
        }
      })
      .catch(error =>  {
        const err = error.response.data.message 
        const errorMessage = err ? err : "An unexpected error occurred. Try again later."
        showError(`🚨 ${errorMessage}`);
      });
  };

  const logout = () => {
    localStorage.removeItem('userData');
    showSuccess(`🎉 Logged Out`);
    disconnectWebSocket();
    navigate('/');
  };

  const connectWebSocket = (username: string) => {
    const ws = new WebSocket('wss://8qombs74rl.execute-api.us-east-1.amazonaws.com/production');
    ws.onopen = () => {
      console.log('Connected to WebSocket');
      setIsConnected(true);
      ws.send(JSON.stringify({ action: 'setName', name: username }));
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.members) {
        setMembers(data.members);
      } else if (data.publicMessage) {
        setChatRows(oldArray => [...oldArray, <span><b>{data.publicMessage}</b></span>]);
      } else if (data.privateMessage) {
        alert(data.privateMessage);
      } else if (data.systemMessage) {
        setChatRows(oldArray => [...oldArray, <span><i>{data.systemMessage}</i></span>]);
      }
    };
    ws.onclose = () => {
      console.log('Disconnected from WebSocket');
      setIsConnected(false);
      setMembers([]);
      setChatRows([]);
    };
    ws.onerror = (error) => console.error('WebSocket error:', error);
    setWebsocket(ws);
  };

  const disconnectWebSocket = () => {
    if (websocket) {
      websocket.close();
      setWebsocket(null);
    }
  };

  const sendMessage = (message: string, type: 'public' | 'private', to?: string) => {
    if (websocket) {
      const action = type === 'public' ? 'sendPublic' : 'sendPrivate';
      websocket.send(JSON.stringify({ action, message, to }));
    }
  };

  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      if (userData.username) {
        connectWebSocket(userData.username);
      }
    }
    return () => {
      disconnectWebSocket();
    };
  }, []);

  const contextValue = getContext();

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
