import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Hello from "./pages/Hello";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AgentHome from "./pages/AgentHome";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  const {isAuthenticated, role} = useAuth() // get user authentication status and role

  return (
    <>
    <Routes>
      {/* general public routes */}
      <Route path="/" element={isAuthenticated ? <Navigate to={`/${role}/home`} /> : <Hello />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to={`/${role}/home`} /> : <SignUp />} />
      <Route path="/signin" element={isAuthenticated ? <Navigate to={`/${role}/home`} /> : <SignIn />} />

      {/* Protected routes. Authentication and Authorization needed */}
      <Route element={<ProtectedRoute isAllowed={isAuthenticated && role === 'Agent'} />}>
          <Route path="/agent/home" element={<AgentHome />} />
      </Route>
      <Route element={<ProtectedRoute isAllowed={isAuthenticated && role === 'Supervisor'} />}>
          <Route path="/supervisor/home" element={<h1>Supervisor</h1>} />
      </Route>

      {/* Any other route which is not found */}
      <Route path="*" element={<h1>Not Found</h1>}></Route>
    </Routes>
     <ToastContainer />
     </>
  );

}
export default App;
