import React, { useContext } from "react";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Homepage from "./pages/homepage";
import { AuthContext } from "./contexts/AuthContext";
import Register from "./pages/Register";
import Captcha from "./pages/vertification/Captcha";


export const App = () => {
  const {user} = useContext(AuthContext);
  return (
    <div>
      <ToastContainer />
        <Routes>
          <Route path="/" element={user ? <Navigate to="/homepage"/> : <Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/verify/:tokenEmail" element={<Captcha/>}/>
          <Route path="/login" element={user ? <Navigate to="/homepage"/> : <Login/>} />
          <Route path="/homepage" element={<Homepage/>}/>
        </Routes>
    </div>
  );
};

export default App;
