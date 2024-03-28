import {
  Routes,
  Route,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AgentOnCall from "./pages/AgentOnCall";

function App() {

  return (
    <>
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<SignIn />} />
      <Route path="/oncall" element={<AgentOnCall />} />
    </Routes>
     <ToastContainer />
     </>
  );

}
export default App;
