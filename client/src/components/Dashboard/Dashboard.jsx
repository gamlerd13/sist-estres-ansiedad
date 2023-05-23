// import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import "./_Dashboard.scss";
//components
import { Sidebar } from "./DashboardComponents/Sidebar/Sidebar";
import { Navbar } from "./DashboardComponents/Navbar/Navbar.jsx";
import { Principal } from "./DashboardComponents/Principal/Principal";

const Dashboard = () => {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const navigateTo = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3002")
      .then((res) => {
        if (res.data.SesionIniciada === true) {
          //no hay mensaje, hay el usuario
          setAuth(true);
          setName(res.data.nick);
          console.log(res.data.nick);
        } else {
          setAuth(false);
          Navigate("/");

          setMessage(res.data.message);
        }
      })
      .then((err) => console.log(err));
  }, []);

  // const handleLogout = () => {
  //   setAuth(false);
  // };
  //para borrar la cookie
  const handleDelete = () => {
    axios
      .get("http://localhost:3002/logout")
      .then((res) => {
        // location.reload(true);
        navigateTo("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mt-4">
      {auth ? (
        <div className="containerDiv">
          <Sidebar email={name} handleDelete={handleDelete} />
          <div className="right">
            <Navbar />
            <Principal />
          </div>
        </div>
      ) : (
        <div>
          <h3>No esta autorizado {message}</h3>
          <a href="/">Login</a>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
