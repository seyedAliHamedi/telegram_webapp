import React, { useEffect, useState } from "react";
import Contact from "./../components/Contact";
import api from "../api";
import "./../../static/style/home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    id: "",
    name: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async () => {
    try {
      const res = await api.get("/contacts/");
      setContacts(res.data);
    } catch (err) {
      alert(err.message);
    }
  };

  const openModal = (id, name) => {
    setModalContent({ id, name });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const createChat = async () => {
    try {
      const res = await api.post("/chats/chats/", { contact: modalContent.id });
      if (res.status === 201) {
        localStorage.setItem("navigatedFromHome", "true");
        navigate("/chat", { state: { contact: modalContent } });
      } else {
        alert("Failed to create chat. Please try again.");
      }
    } catch (error) {
      alert(error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        alert("Error1: " + JSON.stringify(error.response.data));
      } else {
        console.error("Error:", error.message);
        alert("Error2: " + error.message);
      }
    }
  };

  const startNewChat = (contactId) => {
    const contact = contacts.find((contact) => contact.id === contactId);
    if (contact) {
      openModal(contactId, contact.name);
    }
  };

  const viewChat = (contactId) => {
    const contact = contacts.find((contact) => contact.id === contactId);
    if (contact) {
      localStorage.setItem("navigatedFromHome", "true");
      navigate("/chat", { state: { contact: contact } });
    }
  };

  return (
    <div className="home">
      <div className="contacts__container">
        {contacts.map((contact) => (
          <Contact
            key={contact.id}
            name={contact.name}
            telegram_id={contact.telegram_id}
            has_chat={contact.has_chat}
            onInviteClick={() => startNewChat(contact.id)}
            onViewChatClick={() => viewChat(contact.id)}
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Start a New Chat</h2>
            <p>
              You don't have a chat with {modalContent.name}. If you want, you
              can start a new one.
            </p>
            <button onClick={createChat} className="create-chat-button">
              Create Chat
            </button>
            <button onClick={closeModal} className="close-modal-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
