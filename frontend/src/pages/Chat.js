import React from "react";
import { useLocation } from "react-router-dom";
import "./../../static/style/chat.css";

function Chat() {
  const location = useLocation();
  const { contact } = location.state || {};

  return (
    <div className="chat">
      <h1>Chat with {contact ? contact.name : "Unknown"}</h1>
    </div>
  );
}

export default Chat;
