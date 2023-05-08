import Dashboard from "./components/Dashboard/Dashboard.jsx"
import Login from "./components/Login/Login.jsx"
//import Register from "./components/Register/Register.jsx"
import './App.css'
import { useState } from 'react';
//Import React router dom
//import { createBrowserRouter ,RouterProvider, } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";

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

   const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
 
    // <div>
    //   <RouterProvider router={router} />
    // </div>
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        {/* <Route path="/" element={isLoggedIn ? <Dashboard /> : <Login handleLogin={handleLogin} />} /> */}
        <Route path={isLoggedIn ? <Dashboard handleLogout={handleLogout}/> : <Login handleLogin={handleLogin} />}/>


        {/* <Route path="/Dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/Dashboard" element={isLoggedIn ? <Login handleLogin={handleLogout} />:<Dashboard />} /> */}
      </Routes>
    </Router>
  )
}

export default App
