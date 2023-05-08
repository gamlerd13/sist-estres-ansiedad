// import React from 'react'
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  
  const navigateTo = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigateTo("/");
  };

  return (
    <div>
        <span> Hello nameUser, </span>
        {/* <a href='/'>Log out</a> */}

        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard