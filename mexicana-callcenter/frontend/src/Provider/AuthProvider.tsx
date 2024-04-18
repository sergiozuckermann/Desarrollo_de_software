import axios from "axios";
import { createContext, FunctionComponent, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextType, Credentials } from "../utils/interfaces";
import useCustomToast from "../components/notificationComponent";

const baseUrl = 'http://localhost:3000'

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {

  const { showError } = useCustomToast();
  const { showSuccess } = useCustomToast();
  const navigate = useNavigate()
 
    const getContext = () => {
      const userDataString = localStorage.getItem('userData');
  
      // Parse the JSON string back into an object
      const userData = userDataString ? JSON.parse(userDataString) : null;
  
      // if information of the user is present, return that information as the context object
      if(userData) {
        return {
            isAuthenticated: userData.authenticated,
            user: userData.user,
            role: userData.role,
            token: userData.token,
            login,
            logout
          } 
      } 

      // return default values of the context object if no user information is present
      return {
        isAuthenticated: false,
        user: null,
        role: null,
        token: null,
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
    navigate('/')
  } 

  //  value of the authentication context
  const contextValue = getContext()

  // Provide the authentication context to the children components
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;

};


export default AuthProvider;
