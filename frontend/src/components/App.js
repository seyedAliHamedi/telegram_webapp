import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "./../pages/Login";
import Chat from "./../pages/Chat";
import NotFound from "./../pages/NotFound";
import Home from "./../pages/Home";
import Analytics from "../pages/analytics";
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
      <Route path="/chart" element={<Analytics />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoutes childeren={<Home />} />} />
      <Route path="/chat" element={<ProtectedRoutes childeren={<Chat />} />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
