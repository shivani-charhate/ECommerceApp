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
import Private from "./Routes/Private";
import ForgotPassword from "./Auth/ForgotPassword";
import AdminDashboad from "./Admin/AdminDashboard";
import AdminRoute from "./Routes/AdminRoute";
import CreateCategory from "./Admin/CreateCategory";
import CreateProduct from "./Admin/CreateProduct";
import AllUsers from "./Admin/AllUsers";
import Profile from "./user/Profile";
import Order from "./user/Order";
import Products from "./Admin/Products";
import UpdateProduct from "./Admin/UpdateProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/dashboard" element={<Private />}>
        <Route path="user" element={<Dashboard />}></Route>
        <Route path="user/profile" element={<Profile />}></Route>
        <Route path="user/orders" element={<Order />}></Route>
      </Route>
      <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashboad />} />
        <Route path="admin/create-category" element={<CreateCategory />} />
        <Route path="admin/products" element={<Products />} />
        <Route path="admin/create-product" element={<CreateProduct />} />
        <Route path="admin//update-product" element={<UpdateProduct />} />
        <Route path="admin/user" element={<AllUsers />} />
      </Route>
      s<Route path="/register" element={<Register />}></Route>
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
