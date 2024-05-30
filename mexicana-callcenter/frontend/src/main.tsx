import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./css/global.css";
import AuthProvider from "./Provider/AuthProvider";
import WebSocketProvider from "./Provider/WebSocketProvider";
import {DarkModeProvider} from "./Provider/themeProvider";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <AuthProvider>
      <WebSocketProvider>
        <BrowserRouter>
        <DarkModeProvider>
         <App />
         </DarkModeProvider>
        </BrowserRouter>,
      </WebSocketProvider>
    </AuthProvider>
);


