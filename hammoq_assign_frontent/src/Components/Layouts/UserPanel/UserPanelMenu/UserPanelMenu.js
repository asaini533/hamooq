import React from "react";
import { RiDashboardFill } from "react-icons/ri";
import { AiFillHome, AiFillSetting, AiOutlineLogout } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import "./UserPanelMenu.css";

const UserPanelMenu = (props) => {
  return (
    <div className="userPanelMenu__container">
      <div className="userPanelMenu-group__one">
        <div className="userPanelMenu-group__one-dashboard">
          <RiDashboardFill className="userPanelMenu-group__one-dashboard__menuitem__icon" />
          <p className="userPanelMenu-group__one-dashboard__menuitem">
            Dashboard
          </p>
        </div>
        <div className="userPanelMenu-group__one-home">
          <AiFillHome className="userPanelMenu-group__one-home__menuitem__icon" />
          <p className="userPanelMenu-group__one-home__menuitem">Home</p>
        </div>
      </div>

      <div className="userPanelMenu-group__two">
        <div className="userPanelMenu-group__two-profile">
          <FaUserAlt className="userPanelMenu-group__two-profile__menuitem__icon" />
          <p className="userPanelMenu-group__two-profile__menuitem">Profile</p>
        </div>
        <div className="userPanelMenu-group__two-setting">
          <AiFillSetting className="userPanelMenu-group__two-setting__menuitem__icon" />
          <p className="userPanelMenu-group__two-setting__menuitem">Setting</p>
        </div>
        <Link to="/logout">
          <div className="userPanelMenu-group__two-logout">
            <AiOutlineLogout className="userPanelMenu-group__two-logout__menuitem__icon" />
            <p className="userPanelMenu-group__two-logout__menuitem">Logout</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserPanelMenu;
