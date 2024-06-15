// Return the context
import { useContext } from 'react';
// Importing the DarkModeContext from the local ThemeProvider file
import { DarkModeContext } from '../Provider/ThemeProvider';

// Defining the useDarkMode hook
export const useDarkMode = () => {
  // Using the useContext hook to get the context from the DarkModeContext
  const context = useContext(DarkModeContext);
  // If the context is undefined (i.e., useDarkMode is used outside a DarkModeProvider), throw an error
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  // Return the context
  return context;
};