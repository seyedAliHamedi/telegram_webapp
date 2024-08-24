import React from "react";
import "./../../static/style/contact.css";
import avatar from "./../../static/assets/images/img4.webp";
import avatar2 from "./../../static/assets/images/avatar2.webp";

function Contact({
  id,
  name,
  telegram_id,
  has_chat,
  onInviteClick,
  onViewChatClick,
}) {
  return (
    <div className="contact-card">
      <div className="contact-avatar">
        <img src={has_chat ? avatar2 : avatar} alt={`${name}'s avatar`} />
      </div>
      <div className="contact-info">
        <h3>{name}</h3>
        <p>id: {telegram_id}</p>
      </div>
      <div className="contact-invite">
        {!has_chat ? (
          <button onClick={() => onInviteClick(id)}>Start a new chat</button>
        ) : (
          <button onClick={() => onViewChatClick(id)}>View chat</button>
        )}
      </div>
    </div>
  );
}

export default Contact;
