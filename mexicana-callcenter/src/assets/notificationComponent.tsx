import React, { createContext, useContext, ReactNode } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type NotificationContextType = {
  showMessage: (message: string, options?: object) => React.ReactText;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Toastify provides its own state management, so no need for useState here
  
  const showMessage = (message: string, options = {}) => toast(message, options);

  return (
    <NotificationContext.Provider value={{ showMessage }}>
      {children}
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
    </NotificationContext.Provider>
  );
};
