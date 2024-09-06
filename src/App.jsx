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
import ProfileComponent from "./components/user/profileComponent";

export const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/verify/:tokenEmail" element={<Captcha />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/manage-profile" element={<Profile />}>
          <Route index element={<Navigate to={"profile"} />} />
          <Route path="/manage-profile/profile" element={<ProfileComponent />}/>
          <Route path="/manage-profile/activity-history" element={<ActivityHistory />}/>
          <Route path="/manage-profile/setting" element={<Setting />} />
        </Route>
        <Route
          path="/"
          element={user ? <Homepage /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
};

export default App;
