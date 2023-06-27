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
    <div className="bg-slate-200 w-80 h-full mr-1 hidden md:block text-lg p-5 rounded-lg ">
      <div className="h-full flex flex-col justify-center text-xl">
        <div className="flex w-full justify-center basis-3/12">
          <div className="w-80 flex justify-center">
            <img className="rounded-full w-40" src={logo} alt="logo" />
          </div>
        </div>
        <div className="basis-1/12">
          <AccountCircleIcon className="userIcon" />
          <span> {email}</span>
        </div>
        <div className="flex flex-col basis-4/12">
          <ul className="">
            <li
              className="my-3 cursor-pointer hover:text-emerald-300 hover:underline hover:font-semibold"
              onClick={() => setActiveTab("inicio")}
              style={{
                textDecoration:
                  (activeTab == "inicio" && "underline") ||
                  (activeTab == null && "underline"),
                color: activeTab == "inicio" && "#6EE7B7",
                fontWeight: activeTab == "inicio" && "600",
              }}
            >
              <span className="Dashboard">Inicio</span>
            </li>

            {isAdmin ? (
              <>
                <li
                  className="my-3 cursor-pointer hover:text-emerald-300 hover:underline hover:font-semibold"
                  onClick={() => setActiveTab("misalumnos")}
                  style={{
                    textDecoration: activeTab == "misalumnos" && "underline",
                    color: activeTab == "misalumnos" && "#6EE7B7",
                    fontWeight: activeTab == "misañumnos" && "600",
                  }}
                >
                  <span className="Dashboard">Mis Alumnos</span>
                </li>
              </>
            ) : (
              <>
                <li
                  className="my-3 cursor-pointer hover:text-emerald-300 hover:underline hover:font-semibold"
                  onClick={() => setActiveTab("conversemos")}
                  style={{
                    textDecoration: activeTab == "conversemos" && "underline",
                    color: activeTab == "conversemos" && "#6EE7B7",
                    fontWeight: activeTab == "conversemos" && "600",
                  }}
                >
                  <ChatBubbleOutlineIcon className="smaillIconSidebar" />
                  <span className="Dashboard">Conversemos</span>
                </li>
                <li
                  className="my-3 cursor-pointer hover:text-emerald-300 hover:underline hover:font-semibold"
                  onClick={() => setActiveTab("test")}
                  style={{
                    textDecoration: activeTab == "test" && "underline",
                    color: activeTab == "test" && "#6EE7B7",
                    fontWeight: activeTab == "test" && "600",
                  }}
                >
                  <span className="Dashboard">Test</span>
                </li>
              </>
            )}
            <li
              className="my-3 cursor-pointer hover:text-emerald-300 hover:underline hover:font-semibold"
              onClick={() => setActiveTab("dashboard")}
              style={{
                textDecoration: activeTab == "dashboard" && "underline",
                color: activeTab == "dashboard" && "#6EE7B7",
                fontWeight: activeTab == "dashboard" && "600",
              }}
            >
              <span className="Dashboard">Dashboard</span>
            </li>
          </ul>
        </div>
        <div className="w-full basis-1/12 flex justify-center ">
          <button
            className="bg-slate-900 text-gray-200 rounded-lg py-1 px-3 hover:bg-emerald-300"
            onClick={handleDelete}
          >
            <span>Logout</span>
            <LogoutIcon className="logoutIconSidebar" />
          </button>
        </div>
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
