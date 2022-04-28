import React, { useRef, useState } from "react";
import { Avatar } from "@mui/material";
import { connect } from "react-redux";

import "./UserImage.css";
import * as actionCreators from "../../../Store/Actions/index";

const UserImage = (props) => {
  const [image, setImage] = useState(
    "http://localhost:5000/" + props.user.image
  );
  const inputRef = useRef();

  const userImageHandler = () => {
    inputRef.current.click();
  };

  const updateUserImage = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
    props.onUpdateUserImage(props.user._id, event.target.files[0]);
  };

  return (
    <div className="userImage__container">
      <Avatar
        src={image}
        style={{
          width: "130px",
          height: "130px",
        }}
      />
      <input
        accept="image/*"
        id="contained-button-file"
        className="userImage__input"
        multiple
        type="file"
        onChange={updateUserImage}
        ref={inputRef}
      />
      <div className="userImage__inputElement" onClick={userImageHandler}>
        Edit Image
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateUserImage: (userId, image) =>
      dispatch(actionCreators.updateUserImage(userId, image)),
  };
};

export default connect(null, mapDispatchToProps)(UserImage);
