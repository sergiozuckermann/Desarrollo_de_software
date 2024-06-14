// Importing necessary hooks from React
import { useContext } from "react";
// Importing the WebSocketContext from the local WebSocketProvider file
import { WebSocketContext } from "../Provider/WebSocketProvider";
// Importing the WebSocketContextType from the local interfaces file
import { WebSocketContextType } from "../utils/interfaces";

// Defining the useWebSocket hook
export const useWebSocket = (): WebSocketContextType => {
    // Using the useContext hook to get the context from the WebSocketContext
    const context = useContext(WebSocketContext);

    // If the context is not available (i.e., useWebSocket is used outside a WebSocketProvider), throw an error
    if (!context) {
      throw new Error("useWebSocket must be used within an WebSocketProvider");
    }
    // Return the context
    return context;
  };
