import {
  Routes,
  Route,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import {NotificationProvider} from "./assets/notificationComponent";

function App() {

  return (
    <NotificationProvider>
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<SignIn />} />
    </Routes>
    </NotificationProvider>
  );

}
export default App;
