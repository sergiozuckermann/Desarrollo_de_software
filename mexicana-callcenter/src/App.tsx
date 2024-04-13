import {
  Routes,
  Route,
} from "react-router-dom";
import { useEffect } from 'react';
import { useLocation, useNavigate,  } from 'react-router-dom';
import Hello from "./pages/Hello";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AgentHome from "./pages/AgentHome";
import ProfileComponent from "./pages/ProfileTest";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authProvider from './authProvider';
import useCustomToast from "./components/notificationComponent";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showError } = useCustomToast();

  useEffect(() => {
    authProvider.checkAuthentication().catch(() => {
      
      console.log('Usuario no autenticado');
      showError("🚨 Usuario no autenticado");
      navigate("/"); //Hello page
    });
    authProvider.checkAuthorization()?.catch(() => {
      console.log('no autorizado');
      navigate(-1); //previous path
      showError("🚨 Usuario no autorizado"); //NO SALE ERROR SE RELACIONA AL USO DE NAVIGATE
    });
  }, [location.pathname]); //for every path change

  return (
    <>
    <Routes authProvider={authProvider}>
      <Route path="/" element={<Hello />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/agent/home" element={<AgentHome />} />
      <Route path="/profileTest" element={<ProfileComponent />} />
    </Routes>
     <ToastContainer />
     </>
  );

}
export default App;
