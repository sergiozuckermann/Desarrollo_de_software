import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [jobLevel, setJobLevel] = useState(null);

  return (
    <AuthContext.Provider value={{ jobLevel, setJobLevel }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);