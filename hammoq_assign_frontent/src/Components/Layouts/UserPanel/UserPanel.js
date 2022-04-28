import React from "react";

import "./UserPanel.css";
import UserPanelMenu from "./UserPanelMenu/UserPanelMenu";

const UserPanel = (props) => {
  return (
    <div className="userPanel__container">
      <UserPanelMenu />
      <div className="userPanel__body">{props.children}</div>
    </div>
  );
};

export default UserPanel;
