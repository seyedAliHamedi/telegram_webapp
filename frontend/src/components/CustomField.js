import React from "react";
import "./../../static/style/custom_field.css";

function CustomField({ inputType, onChange }) {
  return (
    <div className="custom_field">
      {inputType === "password" ? (
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          onChange={onChange}
        />
      ) : inputType === "email" ? (
        <input
          type="email"
          name="email"
          id="email"
          placeholder="example@email.com"
          onChange={onChange}
        />
      ) : inputType === "name" ? (
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
          onChange={onChange}
        />
      ) : inputType === "username" ? (
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter your username"
          onChange={onChange}
        />
      ) : null}
    </div>
  );
}

export default CustomField;
