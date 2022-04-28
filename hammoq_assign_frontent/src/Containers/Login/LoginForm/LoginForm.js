import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import "./LoginForm.css";
import GoogleAuth from "../../../Components/Shared/GoogleAuth/GoogleAuth";
import FacebookAuth from "../../../Components/Shared/FacebookAuth/FacebookAuth";
import LinkedinAuth from "../../../Components/Shared/LinkedinAuth/LinkedinAuth";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onSubmitHandler = (event) => {
    // navigate("/profile/1452");
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    props.signInHandler(data);
  };

  const onChangeEmailhandler = (event) => {
    setEmail(event.target.value);
  };

  const onChangePasswordhandler = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="loginForm__conatiner">
      <form className="loginForm__form" onSubmit={onSubmitHandler}>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="email"
          required
          onChange={onChangeEmailhandler}
          value={email}
        />
        <TextField
          id="outlined-basic"
          label="Email Address"
          variant="outlined"
          type="password"
          required
          onChange={onChangePasswordhandler}
          value={password}
        />
        <Button variant="contained" size="medium" type="submit">
          Submit
        </Button>
      </form>

      <p className="login__action-or">or</p>

      <div className="login__action-social">
        <GoogleAuth navigate={navigate} />
        <FacebookAuth navigate={navigate} />
        <LinkedinAuth navigate={navigate} />
      </div>
    </div>
  );
};

export default LoginForm;
