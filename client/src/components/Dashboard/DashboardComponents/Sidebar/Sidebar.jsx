import "./Sidebar.scss";
import PropTypes from "prop-types";
import logo from "../../../../LoginAssets/gamlerd13-logo1.png";

//import icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import LogoutIcon from "@mui/icons-material/Logout";

export const Sidebar = ({
  email,
  handleDelete,
  activeTab,
  setActiveTab,
  isAdmin,
}) => {
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
      <div className="sidebarList center">
        <ul>
          <li
            onClick={() => setActiveTab("inicio")}
            style={{
              textDecoration:
                (activeTab == "inicio" && "underline") ||
                (activeTab == null && "underline"),
            }}
          >
            <span className="Dashboard">Inicio</span>
          </li>

          {isAdmin ? (
            <>
              <li
                onClick={() => setActiveTab("misalumnos")}
                style={{
                  textDecoration: activeTab == "misalumnos" && "underline",
                }}
              >
                <span className="Dashboard">Mis Alumnos</span>
              </li>
            </>
          ) : (
            <>
              <li
                onClick={() => setActiveTab("conversemos")}
                style={{
                  textDecoration: activeTab == "conversemos" && "underline",
                }}
              >
                <ChatBubbleOutlineIcon className="smaillIconSidebar" />
                <span className="Dashboard">Conversemos</span>
              </li>
              <li
                onClick={() => setActiveTab("test")}
                style={{ textDecoration: activeTab == "test" && "underline" }}
              >
                <span className="Dashboard">Test</span>
              </li>
            </>
          )}
          <li
            onClick={() => setActiveTab("dashboard")}
            style={{ textDecoration: activeTab == "dashboard" && "underline" }}
          >
            <span className="Dashboard">Dashboard</span>
          </li>
        </ul>
      </div>
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
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
};
