//This is whit a mysql connection
// import {createPool} from 'mysql2'
const {createPool} = require('mysql2')


//The "create pool" is a createConnection equivalent
const db2 = createPool({  //para db2 tambien podemos llamarlo "pool" ya que usa ese tipo de funcion en su conexion
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306', //this depend of number port that will be used
    database:'testAnsiedad'

})

module.export = db2