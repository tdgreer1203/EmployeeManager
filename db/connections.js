const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'P@55w0rd!',
        database: 'employee'
    },
);

module.exports = db;