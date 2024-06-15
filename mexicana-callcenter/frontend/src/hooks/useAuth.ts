// Importing necessary hooks and context from React and local files
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { AuthContextType } from "../utils/interfaces";

// Defining the useAuth hook
export const useAuth = (): AuthContextType => {
    // Using the useContext hook to get the context from the AuthContext
    const context = useContext(AuthContext);
    // If the context is not available (i.e., useAuth is used outside an AuthProvider), throw an error
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    // Return the context
    return context;
  };

  