import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NotFound from "./components/NotFound/index.jsx";

function App() {
  const [auth, setAuth] = useState(null); // null | true | false
  const [name, setName] = useState("");
  const [idUser, setIdUser] = useState();
  const [message, setMessage] = useState("");

  axios.defaults.withCredentials = true;
  useEffect(() => {
    if (auth !== null) return;
    axios
      .get("http://localhost:3002")
      .then((res) => {
        if (res.data.SesionIniciada === true) {
          //no hay mensaje, hay el usuario
          setAuth(true);
          setName(res.data.nick);
          setIdUser(res.data.idUser);
          console.log(
            "nick user: ",
            res.data.nick,
            "id user: ",
            res.data.idUser
          );
        } else {
          setAuth(false);
          setMessage(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  }, [auth]);
  console.log("auth", auth);

  return (
    <Router>
      {auth == null ? (
        <h1>Cargando</h1>
      ) : (
        <Routes>
          {auth ? (
            <>
              <Route
                path="/dashboard"
                element={
                  <Dashboard name={name} setAuth={setAuth} idUser={idUser} />
                }
              />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login setAuth={setAuth} />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
