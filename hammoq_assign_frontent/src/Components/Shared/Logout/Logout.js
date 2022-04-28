import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

import * as actionCreator from "../../../Store/Actions/index";

function Logout(props) {
  useEffect(() => {
    props.onAuthLogout();
    // eslint-disable-next-line
  }, []);

  window.location.reload(false);
  return <Navigate to="/" />;
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthLogout: () => dispatch(actionCreator.authLogout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
