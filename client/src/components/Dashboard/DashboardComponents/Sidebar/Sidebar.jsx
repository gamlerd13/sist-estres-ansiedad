import React from "react";
import "./Sidebar.scss";
import PropTypes from "prop-types";
import logo from "../../../../LoginAssets/gamlerd13-logo1.png";

//import icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import LogoutIcon from "@mui/icons-material/Logout";

export const Sidebar = ({ email, handleDelete }) => {
  return (
    <div className="sidebar">
      <div className="sidebarList top">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="sidebarList usuario">
        <AccountCircleIcon className="userIcon" />
        <span> {email}</span>
      </div>
      {/* <hr /> */}
      <div className="sidebarList center">
        <ul>
          <li>
            <span className="Dashboard">Inicio</span>
          </li>
          <li>
            <ChatBubbleOutlineIcon className="smaillIconSidebar" />
            <span className="Dashboard">Conversemos</span>
          </li>
          <li>
            <span className="Dashboard">Test</span>
          </li>
          <li>
            <span className="Dashboard">Mis Alumnos</span>
          </li>
          <li>
            <span className="Dashboard">Dashboard</span>
          </li>
        </ul>
      </div>
      {/* <hr /> */}
      <div className="sidebarList bottom">
        <button onClick={handleDelete}>
          <span>Logout</span>
          <LogoutIcon className="logoutIconSidebar" />
        </button>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  email: PropTypes.string,
  handleDelete: PropTypes.func.isRequired,
};
