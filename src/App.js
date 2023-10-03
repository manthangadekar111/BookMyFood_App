import Home from "./screen/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./screen/Login";
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import SignUp from "./screen/SignUp";
import { CardProvider } from "./components/ContextReducer";
import Myorder from "./screen/Myorder";

export default function App() {
  return (
    <CardProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createuser" element={<SignUp />} />
            <Route path="/myOrder" element={<Myorder />} />
          
          </Routes>
        </div>
      </Router>
    </CardProvider>

  );
}
