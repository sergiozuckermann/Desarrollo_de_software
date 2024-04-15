import axios from "axios";
import { createContext, useState, FunctionComponent, PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextType, Credentials } from "../utils/interfaces";
import useCustomToast from "../components/notificationComponent";

const baseUrl = 'http://localhost:3000'

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  // State to hold the user authentication information
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { showError } = useCustomToast();
  const { showSuccess } = useCustomToast();
  const navigate = useNavigate()

  useEffect(() => {
        // Retrieve the user data from localStorage
    const userDataString = localStorage.getItem('userData');

    // Parse the JSON string back into an object
    const userData = userDataString ? JSON.parse(userDataString) : null;

    if(userData) {
      setToken(userData.token)
      setUser(userData.user)
      setRole(userData.role)
      setIsAuthenticated(Boolean(userData.authenticated))
    }
  }, [])

  const login = async (credentials: Credentials) => {
    return axios
      .post(`${baseUrl}/auth/login`, credentials)
      .then(res => {
        if(res.status === 200) {
          const { token, name, role } = res.data;

          // Create an object to hold the user information
          const userData = {
              token,
              role,
              user: name,
              authenticated: true
          };

          // Store the combined user data object in localStorage
          localStorage.setItem('userData', JSON.stringify(userData));

          // update state
          setIsAuthenticated(true)
          setToken(token)
          setUser(name)
          setRole(role)

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

  //  value of the authentication context
  const contextValue ={
      isAuthenticated,
      user,
      role,
      token,
      login
    }

  // Provide the authentication context to the children components
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;

};

export default AuthProvider;
