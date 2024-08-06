import "./App.css";
// import Layout from "./Components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Policy from "./Pages/Policy";
import PageNotFound from "./Pages/PageNotFound";
import Register from "./Auth/Register";
import { ToastContainer } from "react-toastify";
import Login from "./Auth/Login";
import Dashboard from "./user/Dashboard";
import Private from "./Routes.js/Private";
import ForgotPassword from "./Auth/ForgotPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/dashboard" element={<Private />}>
        <Route path="" element={<Dashboard />}></Route>
      </Route>

      <Route path="/register" element={<Register />}></Route>
      <Route path="/reset-password" element={<ForgotPassword />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/contact" element={<Contact />}></Route>
      <Route path="/policy" element={<Policy />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="*" element={<PageNotFound />}></Route>
    </Routes>
  );
}

export default App;
