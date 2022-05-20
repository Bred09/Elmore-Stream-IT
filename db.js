const mysql = require('mysql');

// Connect to DB
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "esi",
  password: "6dnBT8Cf5S",
  port: '3306',

  multipleStatements: true
});

db.connect(function(err) {
  if (err) throw err;
  console.log("MySQL Connected!");
});

module.exports = db;