import React, { createContext, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const notify = (message, options = {}) => {
    toast(message, options);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <ToastContainer />
    </NotificationContext.Provider>
  );
};
