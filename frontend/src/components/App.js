import React, { Component, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import NotFound from "./../pages/NotFound";
import Home from "./../pages/Home";

function Logout() {
  localStorage.clear();
  return <Login />;
}
const tele = window.Telegram.WebApp;
function App() {
  useEffect(() => {
    tele.ready();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoutes childeren={<Home />} />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
