import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Login from "./components/Login/Login.jsx";
//import Register from "./components/Register/Register.jsx"
import "./App.css";
// import { useState } from 'react';
//Import React router dom
//import { createBrowserRouter ,RouterProvider, } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Lets Create a router
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <div><Login/></div>
//   },
//   {
//     path: '/register',
//     element: <div><Register/></div>
//   },
//   {
//     path: '/Dashboard',
//     element: <div><Dashboard/></div>
//   }
// ])

function App() {
  return (
    // <div>
    //   <RouterProvider router={router} />
    // </div>
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        {/* <Route path="/" element={isLoggedIn ? <Dashboard /> : <Login handleLogin={handleLogin} />} /> */}

        {/* <Route path={isLoggedIn ? <Dashboard handleLogout={handleLogout}/> : <Login handleLogin={handleLogin} />}/> */}

        {/* <Route path="/Dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/Dashboard" element={isLoggedIn ? <Login handleLogin={handleLogout} />:<Dashboard />} /> */}

        <Route
          path="/"
          element={
            <div>
              <Login />
            </div>
          }
        />
        <Route
          path="/Dashboard"
          element={
            <div>
              <Dashboard />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
