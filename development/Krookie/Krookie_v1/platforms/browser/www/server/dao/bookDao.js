var connection = require('../../db/db_connection.js');
var bookDao = {
    createBook: function (book, OnSuccesfulCallback) {
        var insertStatement = "INSERT INTO books SET?";
        var bookInfo = {
            title: book.title,
            author: book.author,
            fact: "Dit is een leuk weetje, moet van API komen.",
            likes: 69,
            cover: "https://bin.snmmd.nl/m/pury7d5ws8ar.jpg"
        }
        //var connection = connectionProvider.con();
        if (connection) {
            connection.query(insertStatement, bookInfo, function (err, result) {
                if (err) {
                    alert("failed connection bruuh");
                }
                OnSuccesfulCallback({
                    status: 'succesful'
                });
                console.log(result);
            })
        }
    },

    getAllBooks: function (callback) {
        var selectstatement = "SELECT * FROM books";
        if (connection) {
            connection.query(selectstatement, function (err, rows, fields) {
                if (err) {
                    throw err;
                }
                console.log(rows);
                callback(rows);
            });
        }
    }
};

module.exports = bookDao;