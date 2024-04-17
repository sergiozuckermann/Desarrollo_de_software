export interface Credentials {
    username: string;
    password: string;
  }
  
  
export interface AuthContextType {
    isAuthenticated: boolean,
    user: string | null,
    role: string | null,
    token: string | null,
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