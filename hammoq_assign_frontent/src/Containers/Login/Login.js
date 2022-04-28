import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import LoginForm from "./LoginForm/LoginForm";
import * as actionCreators from "../../Store/Actions/index";

const Login = (props) => {
  let navigate = useNavigate();

  const toSignUpHandler = () => {
    navigate("/signup");
  };

  const signInHandler = (data) => {
    props.onAuthSignIn(data, navigate);
  };

  return (
    <div className="login__container">
      <div className="login__brand">
        <p className="login__brand-text__one">Explore your creativity</p>
        <p className="login__brand-text__two">Lorem Ipsum is simply </p>
      </div>
      <div className="login__action">
        <div className="login__action-header">
          <p className="login__action-header-text__one">Hello Again!</p>
          <p className="login__action-header-text__two">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium
          </p>
        </div>

        <LoginForm signInHandler={signInHandler} />
        {props.error && (
          <p className="error">
            <b>Error : </b>Something went wrong, please try again!
          </p>
        )}

        <div className="login__action-footer">
          <p className="login__action-footer__text">
            Don't have an account yet?{" "}
            <span onClick={toSignUpHandler}>Sign Up</span>
          </p>
        </div>
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
    onAuthSignIn: (data, navigate) =>
      dispatch(actionCreators.authSignIn(data, navigate)),
  };
};

export default connect(mapStateFromProps, mapDispatchFromProps)(Login);
