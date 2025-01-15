import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Spaces from "./pages/Spaces.jsx";
import Auth from "./pages/Auth.jsx";
import SpaceDetails from "./pages/SpaceDetails.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import AllComments from "./pages/AllComments.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Spaces />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/space/:id" element={<SpaceDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/all-comments" element={<AllComments />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
