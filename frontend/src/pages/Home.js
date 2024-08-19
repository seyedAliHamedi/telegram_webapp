import React, { useEffect, useState } from "react";
import Contact from "./../components/Contact";
import api from "../api";
import "./../../static/style/home.css";

function Home() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    name: "",
    telegram_id: "",
  });

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = () => {
    api
      .get("/contacts/")
      .then((res) => res.data)
      .then((data) => {
        setContacts(data);
      })
      .catch((err) => alert(err));
  };

  const openModal = (name, telegram_id) => {
    setModalContent({ name, telegram_id });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="home">
      <div className="contacts__container">
        {contacts.map((contact) => (
          <Contact
            key={contact.id}
            name={contact.name}
            telegram_id={contact.telegram_id}
            is_favorite={contact.is_favorite}
            onInviteClick={() => openModal(contact.name, contact.telegram_id)}
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Coming Soon</h2>
            <p>This feature is under development.</p>
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
