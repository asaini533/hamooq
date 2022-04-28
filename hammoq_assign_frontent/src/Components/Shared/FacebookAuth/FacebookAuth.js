import React from "react";
import { FaFacebookF } from "react-icons/fa";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { connect } from "react-redux";

import "./FacebookAuth.css";
import * as actionCreators from "../../../Store/Actions/index";

const FacebookAuth = (props) => {
  const facebookSuccessResponse = (response) => {
    props.onSocialAuth(
      response.expiresIn,
      response.email,
      response.name,
      response.accessToken,
      props.navigate
    );
  };

  return (
    <FacebookLogin
      appId="962483831110008"
      //   autoLoad={true}
      fields="name,email,picture"
      callback={facebookSuccessResponse}
      render={(renderProps) => (
        <div
          className="facebookAuth login__social"
          onClick={renderProps.onClick}
        >
          <FaFacebookF />
        </div>
      )}
    />
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSocialAuth: (expires_in, email, name, token, navigate) =>
      dispatch(
        actionCreators.socialAuth(expires_in, email, name, token, navigate)
      ),

    onSocialAuthFail: (data) => dispatch(actionCreators.socialAuthFail(data)),
  };
};

export default connect(null, mapDispatchToProps)(FacebookAuth);
