import axios from "axios";
import { createContext, FunctionComponent, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextType, Credentials } from "../utils/interfaces";
import useCustomToast from "../components/LoginNotification";
import React, { useState } from 'react';


const baseUrl = 'http://localhost:3000'

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {

  const { showError } = useCustomToast();
  const { showSuccess } = useCustomToast();
  const navigate = useNavigate();
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
 
    const getContext = () => {
      const userDataString = localStorage.getItem('userData');
  
      // Parse the JSON string back into an object
      const userData = userDataString ? JSON.parse(userDataString) : null;
  
      // if information of the user is present, return that information as the context object
      if(userData) {
        const { name, username, role, authenticated } = userData;
        return {
            isAuthenticated: authenticated,
            name,
            username,
            role, 
            login,
            logout
          } 
      } 

      // return default values of the context object if no user information is present
      return {
        isAuthenticated: false,
        name: null,
        username: null,
        role: null,
        login,
        logout
      }
        
      }
    

  // login function
  const login = async (credentials: Credentials) => {
    return axios
      .post(`${baseUrl}/auth/login`, credentials)
      .then(res => {
        if(res.status === 200) {
          const { token, name, username, role } = res.data;

          // Create an object to hold the user information
          const userData = {
              role,
              name, 
              username,
              authenticated: true
          };

          // Store the combined user data object in localStorage
          localStorage.setItem('userData', JSON.stringify(userData));
          localStorage.setItem('token', token);

          // Create a WebSocket connection
          const ws = new WebSocket('wss://8qombs74rl.execute-api.us-east-1.amazonaws.com/production');
          ws.onopen = () => {
            console.log('Connected to WebSocket');
            ws.send(JSON.stringify({ action: 'setName', name: username }));
          };
          ws.onmessage = (event) => console.log('WebSocket message:', event.data);
          ws.onclose = () => console.log('Disconnected from WebSocket');
          ws.onerror = (error) => console.error('WebSocket error:', error);
          setWebsocket(ws);

          // navigate to the hme page based on the user's role
          showSuccess(`🎉 Welcome ${name}!\nYou are now signed in.`);
          navigate(`/${role}/home`)
        }
      })
      .catch(error =>  {
        //check if there was an error logging in and notify the user
        console.log(error)
        const err = error.response.data.message // extract error message from axios response
        const errorMessage = err ? err : "An unexpected error ocurred. Try again later."
        showError(`🚨 ${errorMessage}`);
      }
      )
  }

  // logout function
  const logout = () => {
    localStorage.removeItem('userData')
    showSuccess(`🎉 Logged Out`);
    if (websocket) {
      websocket.close();
      setWebsocket(null);
    }
    navigate('/')
  } 

  //  value of the authentication context
  const contextValue = getContext()

  // Provide the authentication context to the children components
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;

};


export default AuthProvider;
