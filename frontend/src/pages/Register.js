import React, { Component } from "react";
import CustomForm from "./../components/CustomForm";

function Register() {
  return <CustomForm route={"/auth/register/"} method="register" />;
}

export default Register;
