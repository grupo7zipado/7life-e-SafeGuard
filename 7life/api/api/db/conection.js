require('dotenv').config();
const mysql = require("mysql2/promise");


const config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}
let connection;

try {
    connection = mysql.createPool(config)
} catch (error) {
    console.log(error)
}

module.exports = connection;