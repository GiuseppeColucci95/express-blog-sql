//import of mysql2
const mysql = require('mysql2');

//create object with credentials
const credentials = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
}

//creation of connection instance
const connection = mysql.createConnection(credentials);

//effective connection
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL!");
});

//export connection
module.exports = connection;
