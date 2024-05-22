import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./css/global.css";
import AuthProvider from "./Provider/AuthProvider";
import ChatProviderContext from './hooks/ChatContext';


const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <BrowserRouter>
    <AuthProvider>
      <ChatProviderContext>
        <App />
      </ChatProviderContext>
    </AuthProvider>
   </BrowserRouter>,
);


