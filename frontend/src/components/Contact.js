import React from "react";
import "./../../static/style/contact.css";
import avatar from "./../../static/assets/images/img4.webp";
import avatar2 from "./../../static/assets/images/avatar2.webp";

function Contact({ name, telegram_id, is_favorite, onInviteClick }) {
  return (
    <div className="contact-card">
      <div className="contact-avatar">
        <img src={is_favorite ? avatar2 : avatar} alt={`${name}'s avatar`} />
      </div>
      <div className="contact-info">
        <h3>{name}</h3>
        <p>id: {telegram_id}</p>
      </div>
      <div className="contact-invite">
        {!is_favorite && <button onClick={onInviteClick}>Start a chat</button>}
      </div>
    </div>
  );
}

export default Contact;
