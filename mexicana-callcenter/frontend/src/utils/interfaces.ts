export interface Credentials {
    username: string;
    password: string;
  }
  
  
export interface AuthContextType {
    isAuthenticated: boolean,
    name: string | null,
    username: string | null,
    role: string | null,
    login: (credentials: Credentials) => Promise<void>,
    logout: () => void
  }

export interface WorkerCardProps {
  name: string;
  position: string;
  experience: number;
  points: number;
  status?: string;
}

// Define the type for the context value
export interface WebSocketContextType {
  socket:  WebSocket | null;
}