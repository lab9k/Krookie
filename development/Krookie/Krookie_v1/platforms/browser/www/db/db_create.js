var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "Krookie",
  password: "test123"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("CREATE DATABASE IF NOT EXISTS Krookie", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});