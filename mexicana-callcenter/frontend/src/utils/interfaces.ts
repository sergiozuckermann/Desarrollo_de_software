export interface Credentials {
    username: string;
    password: string;
  }
  
  
export interface AuthContextType {
    isAuthenticated: boolean,
    user: string | null,
    role: string | null,
    token: string | null,
    login: (credentials: Credentials) => Promise<void>;
  }