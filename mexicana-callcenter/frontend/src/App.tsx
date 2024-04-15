import { ReactNode } from "react";
import {
  Routes,
  Route,
  Outlet,
  Navigate
} from "react-router-dom";
import Hello from "./pages/Hello";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AgentHome from "./pages/AgentHome";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "./Provider/AuthProvider";

const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/',
  children,
}: {
  isAllowed: boolean,
  redirectPath?: string,
  children?: ReactNode
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};


function App() {

  const {isAuthenticated, role} = useAuth()

  return (
    <>
    <Routes>
   
      <Route path="/" element={isAuthenticated ? <Navigate to={`/${role}/home`} /> : <Hello />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to={`/${role}/home`} /> : <SignUp />} />
      <Route path="/signin" element={isAuthenticated ? <Navigate to={`/${role}/home`} /> : <SignIn />} />
      <Route element={<ProtectedRoute isAllowed={isAuthenticated && role === 'Agent'} />}>
          <Route path="/agent/home" element={<AgentHome />} />
      </Route>
      <Route element={<ProtectedRoute isAllowed={isAuthenticated && role === 'Supervisor'} />}>
          <Route path="/supervisor/home" element={<h1>Supervisor</h1>} />
      </Route>
    </Routes>
     <ToastContainer />
     </>
  );

}
export default App;
