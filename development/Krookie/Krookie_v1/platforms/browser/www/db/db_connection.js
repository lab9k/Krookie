var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  database: "krookie",
  user: "Krookie",
  password: "test123"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;