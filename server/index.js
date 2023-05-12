// our dependencies
import cors from "cors";
import db from "./db2.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import express from "express";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use(cookieParser());

// let us run the server
app.listen(3002, () => {
  console.log("server is runnig in port 3002");
});

//ahora creamos las rutas hacia el servidor que registrará al usuario
app.post("/Register", (req, res) => {
  // Ahora nesecitamos obtener las variables del formulario
  const sentEmail = req.body.Email;
  const sentUserName = req.body.UserName;
  const sentPassword = req.body.Password;
  const sentEstudiante = req.body.Estudiante;

  // creamos el query para insertar en la tabla usuario

  const SQL =
    "INSERT INTO user (email, nick, password, estudiante) VALUES (?,?,?,?)";
  const VALUES = [sentEmail, sentUserName, sentPassword, sentEstudiante];

  //query para ejecutar el sql
  db.query(SQL, VALUES, (err, results) => {
    if (err) {
      res.send(err);
      console.log("hay un error");
    } else {
      console.log("Useuario insertado con exito");
      res.send({ message: "User added!" });
    }
  });
});

// Para verificar ususario en dashboard
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "Necesitamos un token, inciar sesion ahora!" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ message: "Token invalido" });
      } else {
        req.nick = decoded.nick;
        next();
      }
    });
  }
};
app.get("/", verifyUser, (req, res) => {
  return res.json({ SesionIniciada: true, nick: req.nick });
});

///creamos rutas para login
app.post("/Login", (req, res) => {
  const sentLoginUserName = req.body.LoginUserName;
  const sentLoginPassword = req.body.LoginPassword;

  //creamos el query para insertar en la tabla usuario

  const SQL = "SELECT * FROM user WHERE nick = ? && password = ?";
  const VALUES = [sentLoginUserName, sentLoginPassword];

  db.query(SQL, VALUES, (err, data) => {
    if (err) {
      res.send({ message: "Error del servidor" });
      console.log("hay un error");
    }
    if (data.length > 0) {
      const nick = data[0].nick;
      const token = jwt.sign({ nick }, "jwt-secret-key", { expiresIn: "1d" });
      res.cookie("token", token);

      res.send({ SesionIniciada: true });
    } else {
      console.log("credenciales incorrestos clg");
      res.send({ message: "Credenciales incorrectos!!" });
    }
  });
});

//  borrar cookie
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ SesionIniciada: true });
});