import { createContext, useContext, useState, FunctionComponent, PropsWithChildren } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface Credentials {
  username: string;
  password: string;
}


interface AuthContextType {
  isAuthenticated: boolean,
  user: string | null,
  role: string | null,
  token: string | null,
  login: (credentials: Credentials) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<string | null>(localStorage.getItem("user"));
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(Boolean(localStorage.getItem("authenticated")));
  const navigate = useNavigate()

  const login = async (credentials: Credentials) => {
    return axios
      .post('http://localhost:3000/api/login', credentials)
      .then(res => {
        if(res.status === 200) {
          const { token, name, role} = res.data
          localStorage.setItem('token', token)
          localStorage.setItem('user', name)
          localStorage.setItem('role', role)
          localStorage.setItem('authenticated', 'true')
          setIsAuthenticated(true)
          setToken(token)
          setUser(name)
          setRole(role)
          navigate(`/${role}/home`)
          
        }
      })
      .catch(error => 
        console.log("error logging in: ", error)
      )
  }

  // Memoized value of the authentication context
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

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
