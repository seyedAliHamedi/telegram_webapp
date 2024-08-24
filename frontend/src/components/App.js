import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "./../pages/Login";
import Chat from "./../pages/Chat";
import NotFound from "./../pages/NotFound";
import Home from "./../pages/Home";

function Logout() {
  localStorage.clear();
  return <Login />;
}

const tele = window.Telegram.WebApp;

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    tele.ready();
    console.log("App useEffect triggered");
    console.log("Current Path:", location.pathname);
    console.log(
      "navigatedFromHome:",
      localStorage.getItem("navigatedFromHome"),
      localStorage.getItem("navigatedFromHome") == "true"
    );

    if (location.pathname == "/chat" || location.pathname == "/chat/") {
      if (localStorage.getItem("navigatedFromHome") == "true") {
        localStorage.removeItem("navigatedFromHome");
      } else {
        navigate("/");
      }
    }
  }, [navigate, location]);

  return (
    <Routes>
      <Route path="/logout" element={<Logout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoutes childeren={<Home />} />} />
      <Route path="/chat" element={<ProtectedRoutes childeren={<Chat />} />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
