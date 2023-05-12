//This is whit a mysql connection
// import {createPool} from 'mysql2'
import mysql from "mysql2";

//The "create pool" is a createConnection equivalent

/* const db = createPool({  //para db2 tambien podemos llamarlo "pool" ya que usa ese tipo de funcion en su conexion
    host: 'localhost',
    user: 'gamlerd13',
    password: 'gamlerd13',
    port: '3306', //this depend of number port that will be used
    database:'testAnsiedad'

}) */

const db = mysql.createConnection({
  user: "gamlerd13",
  host: "localhost",
  password: "gamlerd13",
  database: "testAnsiedad",
});

export default db;
