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
      console.log("Usuario insertado con exito");
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
        req.idUser = decoded.idUser;

        next();
      }
    });
  }
};
app.get("/", verifyUser, (req, res) => {
  return res.json({ SesionIniciada: true, nick: req.nick, idUser: req.idUser });
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
      const idUser = data[0].id;
      const token = jwt.sign({ nick, idUser }, "jwt-secret-key", {
        expiresIn: "1d",
      });
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

// PARA MOSTRAR PREGUNTAS DE TEST.-------------------------------------------------------
app.get("/test", (req, res) => {
  //creamos el query para insertar en la tabla usuario

  // const SQL = "SELECT * FROM pregunta limit 0,5";// para limitar las preguntas en las pruebas.
  const SQL = "SELECT * FROM pregunta";

  db.query(SQL, (err, data) => {
    if (err) {
      res.send({ message: "Error del servidor" });
      console.log("hay un error");
    }
    if (data.length > 0) {
      res.send(data);
    } else {
      console.log("credenciales incorrestos clg");
      res.send({ message: "Credenciales incorrectos!!" });
    }
  });
});

/// Para enviar las respuestas a la base de datos
app.post("/insertRespuesta", (req, res) => {
  const newRespuesta = req.body.newRespuesta;
  // const idUser = req.body.UserId;
  // const preguntas = req.body.PreguntaId;
  // const nameTest = req.body.nameTest;
  // const respuestas = req.body.respuesta;

  //creamos el query para insertar en la tabla respuestas
  // let SQL =
  //   "insert into pregunta (usuario_id, pregunta_id, name_intento,valor_respuesta) VALUES ";
  // const respuestas_cmd = preguntas
  //   .map(
  //     (pregunta, indice) =>
  //       `(${idUser}, ${pregunta.id}, ${name_intento}, ${respuestas[indice]})`
  //   )
  //   .join(",");
  // SQL += respuestas_cmd;
  // console.log(SQL);

  // mi forma
  let SQL =
    "insert into respuesta (usuario_id, pregunta_id, name_intento,valor_respuesta) VALUES (?,?,?,?)";

  // let VALUES = [
  //   newRespuesta.UserId,
  //   newRespuesta.PreguntaId,
  //   newRespuesta.NameTest,
  //   parseInt(newRespuesta.Respuesta),
  // ];

  let VALUES = newRespuesta.map((element, index) => {
    return [
      newRespuesta[index].UserId,
      newRespuesta[index].PreguntaId,
      newRespuesta[index].NameTest,
      parseInt(newRespuesta[index].Respuesta),
    ];
  });
  console.log(
    "LLeggado del test completo: tipos de dato: ",
    typeof newRespuesta,
    newRespuesta
  );
  console.log("Values: ", VALUES);
  VALUES.map((e, i) => {
    db.query(SQL, VALUES[i], (err, data) => {
      if (err) {
        res.send({ message: "Error del servidor" });
        console.log("hay un error", err);
      } else {
        console.log("respuesta server insertado con exito");
      }
    });
  });
});

// PARA MOSTRAR EL GRAFICO DE TEST.-------------------------------------------------------
app.post("/testChart", (req, res) => {
  const idUser = req.body.idUser;
  const SQL =
    "select * from respuesta join pregunta on respuesta.pregunta_id = pregunta.id where respuesta.usuario_id =?";
  const VALUES = [idUser];

  db.query(SQL, VALUES, (err, data) => {
    if (err) {
      res.send({ message: "Error del servidor" });
      console.log("hay un error");
    }
    if (data.length > 0) {
      res.send(data);
    } else {
      console.log("hay un error en el servidor", data, idUser);
    }
  });
});
