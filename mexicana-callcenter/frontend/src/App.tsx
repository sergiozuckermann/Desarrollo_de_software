import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Hello from './pages/Hello';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AgentHome from './pages/AgentHome';
import OngoingCalls from './pages/OngoingCalls';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import BargeIn from "./pages/bargein";
import SupervisorMain from "./pages/SupervisorMain";
import HomePage from "./pages/AgentMain";
import NotficationCenter from "./pages/Notifications";
import SupervisorNotifications from "./pages/SupervisorNotifications"
import CallOverview from "./pages/CallOverview";
import HistoricalMetrics from "./pages/Metrics";
import ChatWidget from './components/ChatWidget';
import AgentRoutingProfile from './pages/QueueTransfer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


function App() {
  const { isAuthenticated, role } = useAuth(); // get user authentication status and role

  return (
      <>
      <DndProvider backend={HTML5Backend}>
        <Routes>
          {/* General public routes */}
          <Route path="/" element={isAuthenticated ? <Navigate to={`/${role}/home`} /> : <Hello />} />
          <Route path="/signin" element={isAuthenticated ? <Navigate to={`/${role}/home`} /> : <SignIn />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate to={`/${role}/home`} /> : <SignUp />} />

      {/* Protected routes. Authentication and Authorization needed */}
      <Route element={<ProtectedRoute isAllowed={isAuthenticated && role === 'Agent'} />}>
          <Route path="/agent/home" element={< HomePage />} />
          <Route path="agent/workspace" element={< AgentHome />} />
          <Route path="Agent/home/notifications" element={< NotficationCenter />} />
      </Route>
      <Route element={<ProtectedRoute isAllowed={isAuthenticated && role === 'Supervisor'} />}>
          <Route path="/supervisor/ongoingcalls" element={<OngoingCalls />} />
          <Route path="/supervisor/bargein" element={<BargeIn />} />
          <Route path="/supervisor/home" element={<SupervisorMain />} />
          <Route path="/supervisor/notifications" element={<SupervisorNotifications />} />
          <Route path="/supervisor/calloverview" element={<CallOverview />} />
          <Route path="/supervisor/metrics" element={<HistoricalMetrics />} />
          <Route path="/supervisor/agent-transfer" element={<AgentRoutingProfile />} />
      </Route>

          {/* Any other route which is not found */}
          <Route path="*" element={<h1>Not Found</h1>}></Route>
        </Routes>
        <ToastContainer />
        <ChatWidget />
      </DndProvider>
      </>
  );
}

export default App;
