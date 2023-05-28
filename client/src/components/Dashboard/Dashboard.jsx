import PropTypes from "prop-types";
import "./_Dashboard.scss";
import { Sidebar } from "./DashboardComponents/Sidebar/Sidebar";
import { Navbar } from "./DashboardComponents/Navbar/Navbar.jsx";
import { Principal } from "./DashboardComponents/Principal/Principal";

//Import Dashboard components
import { InicioComponent } from "./DashboardComponents/Principal/Inicio";
import { TestComponent } from "./DashboardComponents/Principal/Test";
import { ChatBotComponent } from "./DashboardComponents/Principal/ChatBot";
import { MisAlumnosComponent } from "./DashboardComponents/Principal/MisAlumnos";

import axios from "axios";
import { useEffect, useState } from "react";

//incio del componente principal
const Dashboard = ({ name, setAuth, idUser }) => {
  //components
  const Conversemos = () => <ChatBotComponent />;
  const MisAlumnos = () => <MisAlumnosComponent />;
  const Inicio = () => <InicioComponent />;
  const Test = () => <TestComponent name={name} idUser={idUser} />;

  const isAdmin = name == "admin";
  const [activeTab, setActiveTab] = useState(
    window.localStorage.getItem("activeTab")
  );
  console.log("activeTab", activeTab);

  useEffect(() => {
    window.localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const handleDelete = () => {
    axios
      .get("http://localhost:3002/logout")
      .then(() => {
        setAuth(false);
        localStorage.clear(); //Delete the local storage data
        // window.localStorage.setItem("activeTab", activeTab); //add for me: para que cuando se hace logout vuelva a inicio
        console.log("Activetablogout: ", activeTab);
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
          <Navbar />
          {activeTab == null && <Inicio />}
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
  idUser: PropTypes.number,
};

export default Dashboard;
