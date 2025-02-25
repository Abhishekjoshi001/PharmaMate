// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/homepage.jsx";
import Inventory from "./pages/inventory.jsx";
import Profile from "./pages/profile.jsx";
import Notification from "./pages/notification.jsx";
import RegisterPage from "./pages/registerpage.jsx";
import Login from "./pages/loginpage.jsx";
import AddMedicine from "./pages/addmedicine.jsx";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/addmedicine" element={<AddMedicine />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/notifications" element={<Notification />} />
    </Routes>
  );
}

export default AppRoutes;
