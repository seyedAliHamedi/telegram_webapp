import React from "react";
import "./../../static/style/custom_button.css";

function CustomButton({ title, onClick }) {
  return (
    <div className="custom-button">
      <button onClick={onClick}>{title}</button>
    </div>
  );
}

export default CustomButton;
