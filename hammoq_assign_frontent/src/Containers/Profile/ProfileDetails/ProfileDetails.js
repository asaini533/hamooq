import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { connect } from "react-redux";

import "./ProfileDetails.css";
import * as actionCreators from "../../../Store/Actions/index";

const ProfileDetails = (props) => {
  const name = props.user.name.split(" ");
  const [firstName, setFirstName] = useState(name[0]);
  const [lastName, setLastName] = useState(name[name.length - 1]);
  const [phnNumber, setPhnNumber] = useState(props.user.phnNumber);
  const [email, setEmail] = useState(props.user.email);
  const [gender, setGender] = useState(props.user.gender);
  const [address, setAddress] = useState(props.user.address.address_one);
  const [city, setCity] = useState(props.user.address.city);
  const [state, setState] = useState(props.user.address.state);
  const [country, setCountry] = useState(props.user.address.country);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const data = {
      _id: props.user._id,
      name: firstName + " " + lastName,
      phnNumber: phnNumber,
      email: email,
      gender: gender,
      address: address,
      city: city,
      state: state,
      country: country,
    };

    props.onUpdateSelectedUser(data);
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

  const onChangeGenderHandler = (event) => {
    setGender(event.target.value);
  };

  const onChangeAddresshandler = (event) => {
    setAddress(event.target.value);
  };

  const onChangeCityhandler = (event) => {
    setCity(event.target.value);
  };

  const onChangeStatehandler = (event) => {
    setState(event.target.value);
  };

  const onChangeCountryhandler = (event) => {
    setCountry(event.target.value);
  };

  return (
    <div className="profileDetails__container">
      <form className="profileDetails__form" onSubmit={onSubmitHandler}>
        <div className="profileDetails__form-details">
          <div className="profileDetails__form-details__One">
            <div className="profileDetails__form-details__name">
              <TextField
                id="outlined-basic"
                label="First Name"
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
            </div>
            <TextField
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              type="number"
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
            <div className="profileDetails__form-details-gender">
              Gender :{" "}
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                defaultValue={gender}
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
          </div>
          <div className="profileDetails__form-details__Two">
            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              type="text"
              onChange={onChangeAddresshandler}
              value={address}
            />
            <TextField
              id="outlined-basic"
              label="City"
              variant="outlined"
              type="text"
              onChange={onChangeCityhandler}
              value={city}
            />
            <TextField
              id="outlined-basic"
              label="State"
              variant="outlined"
              type="text"
              onChange={onChangeStatehandler}
              value={state}
            />
            <TextField
              id="outlined-basic"
              label="Country"
              variant="outlined"
              type="text"
              onChange={onChangeCountryhandler}
              value={country}
            />
          </div>
        </div>
        <Button variant="contained" size="medium" type="submit">
          Update
        </Button>
      </form>
    </div>
  );
};

const mapDispatchFromProps = (dispatch) => {
  return {
    onUpdateSelectedUser: (data) =>
      dispatch(actionCreators.updateSelectedUser(data)),
  };
};

export default connect(null, mapDispatchFromProps)(ProfileDetails);
