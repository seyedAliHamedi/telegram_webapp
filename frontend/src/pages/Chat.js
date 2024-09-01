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
      <h2 className="chat-with">
        Chat with{" "}
        <span className="username">{contact ? contact.name : "Unknown"}</span>
      </h2>
      <div className="chat-header">
        {contact && (
          <>
            <div className="contact-info">
              <div className="info-column">
                <p className="label">Phone:</p>
                <p>{contact.phone || "+989121101234"}</p>
              </div>
              <div className="info-column">
                <p className="label">Telegram ID:</p>
                <p>{contact.telegram_id || "@username"}</p>
              </div>
            </div>
            <div className="status-container">
              <div className="status-dot"></div>
              <span>Online</span>
            </div>
          </>
        )}
      </div>

      <div className="chat-messages">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.admin_sender ? "admin" : "user"}`}
            >
              <p>{message.content}</p>
              <span className="timestamp">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          ))
        ) : (
          <div className="no-msg">No messages yet.</div>
        )}
      </div>
    </div>
  );
}

export default Chat;
