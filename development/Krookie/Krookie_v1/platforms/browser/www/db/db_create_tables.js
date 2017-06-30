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
  var books = "CREATE TABLE IF NOT EXISTS books (id INT AUTO_INCREMENT, author VARCHAR(255) NOT NULL, title VARCHAR(255) NOT NULL, fact MEDIUMTEXT NOT NULL, likes INT, cover VARCHAR(255) NOT NULL, PRIMARY KEY(id))";
  var locations = "CREATE TABLE IF NOT EXISTS locations (book_id INT, value JSON NOT NULL, PRIMARY KEY(book_id))";
  var readingskill = "CREATE TABLE IF NOT EXISTS readingSkill (id INT AUTO_INCREMENT , name VARCHAR(255) NOT NULL, PRIMARY KEY(id))";
  var admin = "CREATE TABLE IF NOT EXISTS admin (id INT AUTO_INCREMENT, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id))";
  var category = "CREATE TABLE IF NOT EXISTS category (id INT AUTO_INCREMENT, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))";
  var avatar = "CREATE TABLE IF NOT EXISTS avatar (id INT AUTO_INCREMENT, imgsrc VARCHAR(255) NOT NULL, PRIMARY KEY(id))";
  var sentences = "CREATE TABLE IF NOT EXISTS sentences (id INT AUTO_INCREMENT, sentence MEDIUMTEXT NOT NULL, PRIMARY KEY(id))";
  con.query(books, function (err, result) {
    if (err) throw err;
    console.log("Books table created");
  });
  con.query(locations, function (err, result) {
    if (err) throw err;
    console.log("Locations table created");
  });
  con.query(readingskill, function (err, result) {
    if (err) throw err;
    console.log("Readingskill table created");
  });
  con.query(admin, function (err, result) {
    if (err) throw err;
    console.log("Admin table created");
  });
  con.query(category, function (err, result) {
    if (err) throw err;
    console.log("Category table created");
  });
  con.query(avatar, function (err, result) {
    if (err) throw err;
    console.log("Avatar table created");
  });
  con.query(sentences, function (err, result) {
    if (err) throw err;
    console.log("Sentences table created");
  });
});