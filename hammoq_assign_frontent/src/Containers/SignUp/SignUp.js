import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import "./SignUp.css";
import SignUpForm from "./SignUpForm/SignUpForm";
import * as actionCreators from "../../Store/Actions/index";

const SignUp = (props) => {
  let navigate = useNavigate();

  const toSignInHandler = () => {
    navigate("/");
  };

  const signUpHandler = (data) => {
    props.onAuthSignup(data, navigate);
  };

  return (
    <div className="signup__container">
      <div className="signup__action">
        <div className="signup__action-header">
          <p className="signup__action-header-text__one">Welcome!</p>
          <p className="signup__action-header-text__two">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium
          </p>
        </div>

        <SignUpForm signUpHandler={signUpHandler} />

        {props.error && (
          <p className="error">
            <b>Error : </b>Something went wrong, please try again!
          </p>
        )}

        <div className="signup__action-footer">
          <p className="signup__action-footer__text">
            Already have an account yet?{" "}
            <span onClick={toSignInHandler}>Sign In</span>
          </p>
        </div>
      </div>
      <div className="signup__brand">
        <p className="signup__brand-text__one">Explore your creativity</p>
        <p className="signup__brand-text__two">Lorem Ipsum is simply </p>
      </div>
    </div>
  );
};

const mapStateFromProps = (state) => {
  return {
    error: state.user.error,
  };
};

const mapDispatchFromProps = (dispatch) => {
  return {
    onAuthSignup: (data, navigate) =>
      dispatch(actionCreators.authSignup(data, navigate)),
  };
};

export default connect(mapStateFromProps, mapDispatchFromProps)(SignUp);
