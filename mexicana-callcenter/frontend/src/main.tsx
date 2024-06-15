// Code to render the application in the DOM
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./css/global.css";
import AuthProvider from "./Provider/AuthProvider";
import WebSocketProvider from "./Provider/WebSocketProvider";
import {DarkModeProvider} from "./Provider/ThemeProvider";

// Get the root container element from the DOM
const container = document.getElementById("root");

// Create a root to render the application
const root = createRoot(container!);

// Render the application with the BrowserRouter and the AuthProvider
root.render(
  <BrowserRouter> {/*  Enable routing with BrowserRouter */}
    <AuthProvider> {/* AuthProvider to manage authentication context */}
      <WebSocketProvider>  {/* WebSocketProvider to manage WebSocket context */}
        <DarkModeProvider> {/* DarkModeProvider to manage dark mode context */}
         <App />  {/* Render the main App component  */}
         </DarkModeProvider>
      </WebSocketProvider>
    </AuthProvider>
  </BrowserRouter>,
);