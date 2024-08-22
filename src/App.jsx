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

export const App = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const showNavbar =
    location.pathname !== "/login" &&
    location.pathname !== "/register" &&
    location.pathname !== "/verify/:tokenEmail" &&
    location.pathname !== "/";
  return (
    <div>
      <ToastContainer />
      {showNavbar && <NavbarMain />}
      <Container>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/homepage" /> : <Login />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/verify/:tokenEmail" element={<Captcha />} />
          <Route path="/login" element={user ? <Navigate to="/homepage" /> : <Login />}/>
          <Route path="/homepage" element={user ? <Homepage /> : <Navigate to="/login" />}/>
        </Routes>
      </Container>
    </div>
  );
};

export default App;
