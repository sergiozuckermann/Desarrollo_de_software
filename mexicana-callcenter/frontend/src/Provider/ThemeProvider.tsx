// src/Provider/ThemeProvider.tsx
// Code to manage the theme context of the application (light/dark mode)
import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Define the context type for dark mode
interface DarkModeContextProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

// Create a context for dark mode with a default value of undefined
export const DarkModeContext = createContext<DarkModeContextProps | undefined>(undefined);

// Define the props for the dark mode provider and childeren type (react node)
interface DarkModeProviderProps {
  children: ReactNode;
}
// DarkModeProvider component to provide dark mode context to its children
export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize dark mode state from localStorage or default to false
    const savedMode = localStorage.getItem('dark-mode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
      // Add or remove 'dark' class on the document root element based on dark mode state
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save dark mode state to localStorage
    localStorage.setItem('dark-mode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
      // Provide the dark mode state and setter function to children via context
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
