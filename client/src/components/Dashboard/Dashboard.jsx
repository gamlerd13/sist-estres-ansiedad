import PropTypes from "prop-types";
import "./_Dashboard.scss";
import { Sidebar } from "./DashboardComponents/Sidebar/Sidebar";
import { Navbar } from "./DashboardComponents/Navbar/Navbar.jsx";
import { Principal } from "./DashboardComponents/Principal/Principal";
import axios from "axios";
import { useEffect, useState } from "react";

const Conversemos = () => <h1>Conversemos</h1>;
const MisAlumnos = () => <h1>MisAlumnos</h1>;
const Inicio = () => <h1>Inicio</h1>;
const Test = () => <h1>Test</h1>;

const Dashboard = ({ name, setAuth }) => {
  const isAdmin = name == "admin";
  const [activeTab, setActiveTab] = useState(
    window.localStorage.getItem("activeTab")
  );

  useEffect(() => {
    window.localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

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
        <Sidebar
          email={name}
          handleDelete={handleDelete}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isAdmin={isAdmin}
        />
        <div className="right">
          {/* <Navbar /> */}
          {activeTab == "inicio" && <Inicio />}
          {activeTab == "dashboard" && <Principal />}
          {activeTab == "conversemos" && <Conversemos />}
          {activeTab == "test" && <Test />}
          {activeTab == "misalumnos" && <MisAlumnos />}
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
