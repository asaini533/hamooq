import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import "./SignUpForm.css";

const SignUpForm = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phnNumber, setPhnNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const data = {
      firstName: firstName,
      lastName: lastName,
      phnNumber: phnNumber,
      email: email,
      password: password,
      gender: gender,
    };
    props.signUpHandler(data);
  };

  const onChangeFirstNamehandler = (event) => {
    setFirstName(event.target.value);
  };

  const onChangeLastNamehandler = (event) => {
    setLastName(event.target.value);
  };

  const onChangePhnNumberhandler = (event) => {
    setPhnNumber(event.target.value);
  };

  const onChangeEmailhandler = (event) => {
    setEmail(event.target.value);
  };

  const onChangePasswordhandler = (event) => {
    setPassword(event.target.value);
  };

  const onChangeGenderHandler = (event) => {
    setGender(event.target.value);
  };

  return (
    <div className="signupform__conatiner">
      <form className="signupform__form" onSubmit={onSubmitHandler}>
        <TextField
          id="outlined-basic"
          label="FirstName"
          variant="outlined"
          type="text"
          required
          onChange={onChangeFirstNamehandler}
          value={firstName}
        />
        <TextField
          id="outlined-basic"
          label="Last Name"
          variant="outlined"
          type="text"
          required
          onChange={onChangeLastNamehandler}
          value={lastName}
        />
        <TextField
          id="outlined-basic"
          label="Phone Number"
          variant="outlined"
          type="number"
          required
          onChange={onChangePhnNumberhandler}
          value={phnNumber}
        />
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
          label="Password"
          variant="outlined"
          type="password"
          required
          onChange={onChangePasswordhandler}
          value={password}
        />
        <div className="signup__form-gender">
          Gender :{" "}
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            row
          >
            <FormControlLabel
              value="Female"
              control={<Radio onChange={onChangeGenderHandler} />}
              label="Female"
            />
            <FormControlLabel
              value="Male"
              control={<Radio onChange={onChangeGenderHandler} />}
              label="Male"
            />
          </RadioGroup>
        </div>

        <Button variant="contained" size="medium" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
