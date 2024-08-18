import React, { Component } from "react";
import CustomForm from "./../components/CustomForm";

function Login() {
  return <CustomForm route={"/auth/token/"} method="login" />;
}

export default Login;
