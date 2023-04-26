import Dashboard from "./components/Dashboard/Dashboard.jsx"
import Login from "./components/Login/Login.jsx"
import Register from "./components/Register/Register.jsx"
import './App.css'

//Import React router dom
import { createBrowserRouter ,RouterProvider, } from 'react-router-dom'

//Lets Create a router
const router = createBrowserRouter([
  {
    path: '/',
    element: <div><Login/></div>
  },
  {
    path: '/register',
    element: <div><Register/></div>
  },
  {
    path: '/Dashboard',
    element: <div><Dashboard/></div>
  }
])


function App() {


  return (
 
    <div>
      <RouterProvider router={router} />
    </div>
    
  )
}

export default App
