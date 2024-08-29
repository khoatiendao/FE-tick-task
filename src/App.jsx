import React, { useContext } from "react";
import { Navigate, Route, Router, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Homepage from "./pages/homepage";
import { AuthContext } from "./contexts/AuthContext";
import Register from "./pages/Register";
import Captcha from "./pages/vertification/Captcha";
import { Container } from "@mui/material";
import NavbarMain from "./components/navbar/NavbarMain";
import SideBarMain from "./components/navbar/SideBarMain";
import Profile from "./pages/profile";
import ActivityHistory from "./pages/ActivityHistory";
import Setting from "./pages/Setting";

export const App = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const showNavbar =
    location.pathname !== "/login" &&
    location.pathname !== "/register" &&
    location.pathname !== "/verify/:tokenEmail" &&
    location.pathname !== "/"

  const showSideBar = location.pathname !== "/login" &&
    location.pathname !== "/register" &&
    location.pathname !== "/verify/:tokenEmail" &&
    location.pathname !== "/" &&
    location.pathname !== "/profile" &&
    location.pathname !== "/activity" &&
    location.pathname !== "/setting"

  return (
    <div>
      <ToastContainer />
      {showNavbar && <NavbarMain />}
      {showSideBar && <SideBarMain/>}
      <Routes>
        <Route path="/" element={user ? <Navigate to="/homepage" /> : <Login />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/verify/:tokenEmail" element={<Captcha />} />
        <Route path="/login" element={user ? <Navigate to="/homepage" /> : <Login />}/>
        <Route path="/profile" element={<Profile/>}/>
        {/* <Route path="/activity" element={<ActivityHistory/>}/>
        <Route path="/setting" element={<Setting/>}/> */}
        <Route path="/homepage" element={user ? <Homepage /> : <Navigate to="/login" />}/>
      </Routes>
    </div>
  );
};

export default App;
