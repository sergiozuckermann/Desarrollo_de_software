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

  export interface FormInputProps {
    type: string,
    placeholder: string,
    name: string,
    required: boolean,
    value: string,
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void,
    icon?: string,
    onIconClick?: () => void,
  }
export interface WorkerCardProps {
  name: string;
  position: string;
  experience: number;
  points: number;
  status?: string;
}
