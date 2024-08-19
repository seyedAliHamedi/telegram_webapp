import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import CustomButton from "./../components/CustomButton";
import CustomField from "./../components/CustomField";
import avatar from "./../../static/assets/images/img4.webp";
import headerImg from "./../../static/assets/images/img3.svg";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TweeterIcon from "@mui/icons-material/X";
import "./../../static/style/register.css";
function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acceptedTerms) {
      alert("Terms not accepted");
      return;
    }
    try {
      const res = await api.post("/auth/token/", {
        name,
        username,
        email,
        password,
      });
      if (res.status == 200) {
        navigate("/login/");
      }
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
    <div className="register">
      <div
        className="register__header"
        style={{ backgroundImage: `url(${headerImg})` }}
      >
        <div className="register__avatar-container">
          <div className="register__avatar">
            <img src={avatar} alt="avatar" />
            <button className="register__add-profile-btn">+</button>
          </div>
        </div>
      </div>
      <div className="register__form">
        <h2>Sign up</h2>
        <CustomField
          inputType="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <CustomField
          inputType="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <CustomField
          inputType="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <CustomField
          inputType="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="register__terms">
          <input
            type="checkbox"
            id="accept-conditions"
            onChange={(e) => {
              setAcceptedTerms(e.target.value);
            }}
          />
          <label htmlFor="accept-conditions">I accept all conditions</label>
        </div>

        <CustomButton title="Sing Up" onClick={handleSubmit} />
      </div>
      <div>
        Or create an account using social media
        <div className="social-media-icons">
          <GoogleIcon style={{ fontSize: 30, margin: 5 }} />
          <FacebookIcon style={{ fontSize: 30, margin: 5 }} />
          <TweeterIcon style={{ fontSize: 30, margin: 5 }} />
        </div>
      </div>
    </div>
  );
}

export default Register;
