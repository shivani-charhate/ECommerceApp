import React from "react";
import { Toaster } from "react-hot-toast";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main style={{ minHeight: "70vh" }}> {children}</main>
      <Toaster />
      <Footer />
    </div>
  );
};

export default Layout;
