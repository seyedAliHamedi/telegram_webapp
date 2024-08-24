import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api";
import "./../../static/style/chat.css";

function Chat() {
  const location = useLocation();
  const { chat, contact } = location.state || {};
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    try {
      if (chat && chat.id) {
        const chatId = chat.id;
        const response = await api.get(`/chats/chats/${chatId}/messages/`);
        alert(response.data);
        setMessages(response.data);
      } else {
        throw new Error("Invalid chat ID");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [chat]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="chat">
      <div className="chat-header">
        <h1>Chat with {contact ? contact.name : "Unknown"}</h1>
      </div>
      <div className="chat-messages">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              className={`message ${
                message.admin_sender ? "admin" : "contact"
              }`}
            >
              <p>{message.content}</p>
              <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
            </div>
          ))
        ) : (
          <div>No messages yet.</div>
        )}
      </div>
    </div>
  );
}

export default Chat;
