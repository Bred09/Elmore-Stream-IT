const mysql = require('mysql');

// Connect to DB
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "esi",
  password: "MyPasswordForphpMyAdmin=159920042002",

  multipleStatements: true
});

db.connect(function(err) {
  if (err) throw err;
  console.log("MySQL Connected!");
});

module.exports = db;