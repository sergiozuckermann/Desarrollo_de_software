// Code to manage the authentication context of the application
import axios from "axios";
import { createContext, FunctionComponent, PropsWithChildren } from "react";
import { AuthContextType, Credentials } from "../utils/interfaces";
import useCustomToast from "../components/LoginNotification";
import { useNavigate } from "react-router-dom";
import conf from '../conf';

// Base URL of the API
const baseUrl = conf.apiUrl;//'http://localhost:3000';


// Create the authentication context
export const AuthContext = createContext<AuthContextType | null>(null);

// Create the authentication provider
const AuthProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {

  // Function to get the user context from the session storage
  const { showError } = useCustomToast();
  const { showSuccess } = useCustomToast();
  const { showCustom } = useCustomToast();
  const navigate = useNavigate()

  const getContext = () => {
    const userDataString = sessionStorage.getItem('userData');

    // Parse the JSON string back into an object
    const userData = userDataString ? JSON.parse(userDataString) : null;

    // if information of the user is present, return that information as the context object
    if (userData) {
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
        if (res.status === 200) {
          const { token, name, username, role } = res.data;

          // Create an object to hold the user information
          const userData = {
            role,
            name,
            username,
            authenticated: true
          };

          // Store the combined user data object in sessionStorage
          sessionStorage.setItem('userData', JSON.stringify(userData));
          sessionStorage.setItem('token', token);

          // navigate to the hme page based on the user's role
          navigate(`/${role}/home`)
          showSuccess(`🎉 Welcome ${name}!\nYou are now signed in.`);
          // show a custom notification to the user if is a supervisor
          if (role === 'supervisor') {
            showCustom("Wait for the Contact Control Panel popup to log in with your credentials", "gray");
          }
        }
      })
      .catch(error => {
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
    sessionStorage.clear()
    showSuccess(`🎉 Logged Out`);
    navigate('/')
  }

  //  value of the authentication context
  const contextValue = {
    ...getContext(),
    logout, // Agregar la función logout al contextValue
  };

  // Provide the authentication context to the children components
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;

};


export default AuthProvider;