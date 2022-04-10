const mysql = require('mysql');

// Connect to DB
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "esi",
  password: "",

  multipleStatements: true
});

db.connect(function(err) {
  if (err) throw err;
  console.log("MySQL Connected!");
});

module.exports = db;