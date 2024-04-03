import {
  Routes,
  Route,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AgentHome from "./pages/AgentHome";
import ProfileComponent from "./pages/ProfileTest";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<SignIn />} />
      <Route path="/agent/home" element={<AgentHome />} />
      <Route path="/profileTest" element={<ProfileComponent />} />
    </Routes>
     <ToastContainer />
     </>
  );

}
export default App;
