import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import * as actionCreators from "./Store/Actions/index";

const Login = React.lazy(() => import("./Containers/Login/Login"));
const SignUp = React.lazy(() => import("./Containers/SignUp/SignUp"));
const Profile = React.lazy(() => import("./Containers/Profile/Profile"));
const Logout = React.lazy(() => import("./Components/Shared/Logout/Logout"));
const ErrorPage = React.lazy(() => import("./Components/Shared/404/404"));

function App(props) {
  const token = localStorage.getItem("token");
  const isAuthenticated = token !== null;

  useEffect(() => {
    window.scrollTo(0, 0);
    props.onAuthCheckState();
    // eslint-disable-next-line
  }, []);

  let routes;

  if (isAuthenticated) {
    routes = (
      <Routes>
        <Route path="/profile/:userid" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route exact path="/" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <Router>
      <Suspense>{routes}</Suspense>
    </Router>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthCheckState: () => dispatch(actionCreators.authCheckState()),
  };
};

export default connect(null, mapDispatchToProps)(App);
