// our dependencies
const cors = require('cors')

// const mysql = require('mysql2');
const db= require('./db2.js')

const express = require('express')
const app = express()



app.use(express.json())
app.use(cors())

// let us run the server
app.listen(3002, ()=>{
    console.log('server is runnig in port 3002')
    
})

//ahora creamos las rutas hacia el servidor que registrará al usuario
app.post('/Register', (req, res)=>{
    //ahora nesecitamos obtener las variables del formulario
    const sentEmail = req.body.Email
    const sentUserName = req.body.UserName
    const sentPassword = req.body.Password
    const sentEstudiante = req.body.Estudiante

    //creamos el query para insertar en la tabla usuario

    const SQL = 'INSERT INTO user (email, nick, password, estudiante) VALUES (?,?,?,?)'
    const VALUES = [sentEmail, sentUserName, sentPassword, sentEstudiante]

    //query para ejecutar el sql 
    db.query(SQL, VALUES, (err, results)=>{
        if(err){ 
            res.send(err)
            console.log("hay un error")
        }else{
            console.log('Useuario insertado con exito')
            res.send({message: 'User added!'})
        }
    })
})


///creamos rutas para login

app.post('/Login', (req, res)   => {
    const sentLoginUserName = req.body.LoginUserName
    const sentLoginPassword = req.body.LoginPassword

    //creamos el query para insertar en la tabla usuario

    const SQL = 'SELECT * FROM user WHERE nick = ? && password = ?'
    const VALUES = [sentLoginUserName, sentLoginPassword]

    db.query(SQL, VALUES, (err, results)=>{
        if(err){ 
            res.send({error: err})
            console.log("hay un error")
        }
        if(results.length > 0){
            res.send(results)
        }
        else{
            console.log('credenciales incorrestos clg')
            res.send({message: `Credenciales incorrectos!`})
        }
    })
})