import PropTypes from "prop-types";
import "./_Dashboard.scss";
import { Sidebar } from "./DashboardComponents/Sidebar/Sidebar";
import { Navbar } from "./DashboardComponents/Navbar/Navbar.jsx";
import { Principal } from "./DashboardComponents/Principal/Principal";
import axios from "axios";

const Dashboard = ({ name, setAuth }) => {
  const handleDelete = () => {
    axios
      .get("http://localhost:3002/logout")
      .then(() => {
        setAuth(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mt-4">
      <div className="containerDiv">
        <Sidebar email={name} handleDelete={handleDelete} />
        <div className="right">
          <Navbar />
          <Principal />
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  name: PropTypes.string,
  setAuth: PropTypes.func.isRequired,
};

export default Dashboard;
