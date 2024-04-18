export interface Credentials {
    username: string;
    password: string;
  }
  
  
export interface AuthContextType {
    isAuthenticated: boolean,
    name: string | null,
    username: string | null,
    role: string | null,
    token: string | null,
    login: (credentials: Credentials) => Promise<void>,
    logout: () => void
  }