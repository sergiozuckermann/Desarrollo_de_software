import { useContext } from "react";
import { WebSocketContext } from "../Provider/WebSocketProvider";
import { WebSocketContextType } from "../utils/interfaces";

export const useWebSocket = (): WebSocketContextType => {
    const context = useContext(WebSocketContext);
    if (!context) {
      throw new Error("useWebSocket must be used within an WebSocketProvider");
    }
    return context;
  };
