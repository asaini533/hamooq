import React from "react";
import { FaGoogle } from "react-icons/fa";
import { connect } from "react-redux";

import "./GoogleAuth.css";
import GoogleLogin from "react-google-login";
import * as actionCreators from "../../../Store/Actions/index";

const GoogleAuth = (props) => {
  const googleSuccessResponse = (response) => {
    props.onSocialAuth(
      response.tokenObj.expires_in,
      response.profileObj.email,
      response.profileObj.name,
      response.accessToken,
      props.navigate
    );
  };

  const googleFailResponse = (response) => {
    props.onSocialAuthFail(response);
  };

  return (
    <GoogleLogin
      // className="googleAuth_google"
      clientId="848887414352-lfumsgh0bmhl9e4v6se2vonu6sh1qj3p.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={googleSuccessResponse}
      onFailure={googleFailResponse}
      cookiePolicy={"single_host_origin"}
      render={(renderProps) => (
        <div className="googleAuth login__social" onClick={renderProps.onClick}>
          <FaGoogle />
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

export default connect(null, mapDispatchToProps)(GoogleAuth);
