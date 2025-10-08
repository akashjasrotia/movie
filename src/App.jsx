import React from "react";
import Movies from "./components/movies";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <div>
      <Navbar />
      <ToastContainer
        position="top-right"
        hideProgressBar={true}
        theme="colored"
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
