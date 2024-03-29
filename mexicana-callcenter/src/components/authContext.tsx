import { createContext, useContext, useState, FunctionComponent, PropsWithChildren } from 'react';

export interface CustomTokenPayload {
  'custom:job_level': string;
}

interface AuthContextType {
  jobLevel?: string;
  setJobLevel: (level: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FunctionComponent<PropsWithChildren<{}>> = ({ children }) => {
  const [jobLevel, setJobLevel] = useState<string | undefined>();

  const value = { jobLevel, setJobLevel };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    // This is a failsafe and theoretically should never happen because
    // useAuth should only be used within components wrapped in AuthProvider,
    // which provides a non-null context value.
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
