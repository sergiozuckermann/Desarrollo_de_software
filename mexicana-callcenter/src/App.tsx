import {
  Routes,
  Route,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";


function App() {

  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<SignIn />} />
    </Routes>
  );

}
export default App;
