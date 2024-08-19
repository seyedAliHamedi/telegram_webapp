import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOEKN } from "../constants";
import CustomButton from "./../components/CustomButton";
import CustomField from "./../components/CustomField";
import headerImg from "./../../static/assets/images/img3.svg";
import "./../../static/style/login.css";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate("/register");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/token/", { username, password });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOEKN, res.data.refresh);
      navigate("/");
    } catch (error) {
      alert(error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        alert("Error: " + JSON.stringify(error.response.data));
      } else {
        console.error("Error:", error.message);
        alert("Error: " + error.message);
      }
    }
  };

  return (
    <div className="login">
      <div className="login__header">
        <div className="login__header-img">
          <img src={headerImg} alt="form header"></img>
        </div>
        <h2>Hello</h2>
        <p>Sing in to your account </p>
      </div>
      <div className="login__form">
        <CustomField
          inputType="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <CustomField
          inputType="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <p>Forgot your password?</p>
        <CustomButton title="Sing in" onClick={handleSubmit} />
      </div>
      <p>
        Don't have an account?<span onClick={handleCreateClick}>Create</span>
      </p>
    </div>
  );
}

export default Login;
