import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import "./Profile.css";
import UserPanel from "../../Components/Layouts/UserPanel/UserPanel";
import UserImage from "../../Components/Shared/UserImage/UserImage";
import ProfileDetails from "./ProfileDetails/ProfileDetails";
import ReactSpinner from "../../Components/Shared/ReactSpinner/ReactSpinner";
import * as actionCreators from "../../Store/Actions/index";

const Profile = (props) => {
  const params = useParams();

  const { onGetSelectedUser } = props;

  useEffect(() => {
    onGetSelectedUser(params.userid);
  }, [onGetSelectedUser, params.userid]);

  return (
    <>
      {props.loading || props.user === null ? (
        <ReactSpinner />
      ) : (
        <UserPanel>
          <UserImage user={props.user} />
          <ProfileDetails user={props.user} />
        </UserPanel>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    loading: state.user.loading,
    error: state.user.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetSelectedUser: (userid) =>
      dispatch(actionCreators.getSelectedUser(userid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
