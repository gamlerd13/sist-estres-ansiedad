import { useState } from "react";
import "./Register.css";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

//import icon react-icon
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";

// Import our assets, video and img
import video from "../../LoginAssets/video2.mp4";
import logo from "../../LoginAssets/gamlerd13-logo1.png";

const Register = () => {
  //useState para nuestros inputs
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [estudiante, setEstudiante] = useState(false);

  const navigateTo = useNavigate();

  const checkEmail = (event) => {
    //Asignamos cada cambio del input para guardar y comprobarlo en tiempo real
    setEmail(event.target.value);
    //console.log(email) ///borrar este es para ver en consola su valor
  };

  const createUser = (e) => {
    e.preventDefault();
    console.log("hasta aqui bien");

    //aqui trabajamos con axios para la api//instalamos axios
    axios
      .post("http://localhost:3002/rEGister", {
        //creamos una variable para enviar al servidor mediante rutas
        Email: email,
        UserName: userName,
        Password: password,
        Estudiante: estudiante,
      })
      .then(() => {
        console.log("user has been created");
        //redirigimos a la pagina de login
        navigateTo("/");
        //borramos los campos
        setEmail("");
        setUserName("");
        setPassword("");
        setEstudiante(false);
      });
  };

  return (
    <div className="registerPage flex">
      <div className="container flex">
        {/* ### incio video */}
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>
          <div className="textDiv">
            <h2 className="title">Estres o Ansiedad ? </h2>
            <p>Te ayudamos a solucionarlo</p>
          </div>
          <div className="footerDiv flex">
            <span className="text"> Already yo have acount?</span>
            <Link to={"../"}>
              <button className="btn">Login</button>
            </Link>
          </div>
        </div>
        {/* ## Fin video */}
        <div className="formDiv flex">
          <div className="headerDiv">
            <img
              src={logo}
              alt="logo image"
              onClick={() => {
                console.log(email, userName, password, estudiante);
              }}
            />
            <h3>Let us now you</h3>
          </div>

          {/* INICO DEL FROMULARIO */}
          <form action="" className="form grid">
            <span className="showMessage">Register status will go here</span>
            {/* Email */}
            <div className="inputDiv">
              {/* <label htmlFor="email">email</label> */}
              <div className="input flex">
                <MdMarkEmailRead className="icon" />
                <input
                  type="text"
                  name=""
                  id="email"
                  placeholder="Enter email"
                  onChange={checkEmail}
                />
              </div>
            </div>
            {/* Username */}
            <div className="inputDiv">
              {/* <label htmlFor="username">Username</label> */}
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  name=""
                  id="username"
                  placeholder="Enter username"
                  onChange={(event) => {
                    setUserName(event.target.value);
                  }}
                />
              </div>
            </div>
            {/* Password */}
            <div className="inputDiv">
              {/* <label htmlFor="password">password</label> */}
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="password"
                  name=""
                  id="password"
                  placeholder="Enter password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
            </div>
            {/* opc */}
            <div className="inputDiv">
              <label className="labelEstudainte" htmlFor="estudiante">
                <input
                  checked={estudiante}
                  className="inputEstudiante"
                  type="checkbox"
                  id="estudiante"
                  name="estudiante"
                  value="estudiante"
                  onChange={(event) => {
                    setEstudiante(event.target.checked);
                    console.log(event.target.checked); ///borrar este es para ver en consola su valor
                  }}
                />
                Are you a student?{" "}
              </label>
            </div>
            {/* Button */}
            <button type="submit" className="btn flex" onClick={createUser}>
              <span>Register</span>
              <AiOutlineSwapRight className="icon" />
            </button>
            <span className="forgotPassword">
              Forgot your password? <a href="">Click Here</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
