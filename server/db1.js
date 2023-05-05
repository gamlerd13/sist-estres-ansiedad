const mysql = require('mysql');

//let us created our database (mysql)
const db1 = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'testAnsiedad'
})

module.export = db1