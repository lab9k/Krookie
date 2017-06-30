function BookRouteConfiguration(app) {
    this.app = app;
    this.routeTable = [];
    this.init();
}

BookRouteConfiguration.prototype.init = function () {
    var self = this;
    this.addRoutes();
    this.processRoutes();
}

BookRouteConfiguration.prototype.processRoutes = function () {
    var self = this;
    self.routeTable.forEach(
        function (route) {
            if (route.requestType == 'get') {
                self.app.get(route.requestUrl, route.callbackFunction);
            } else if (route.requestType == 'post') {
                self.app.post(route.requestUrl, route.callbackFunction);
            } else if (route.requestType == 'delete') {
                self.app.delete(route.requestUrl, route.callbackFunction);
            }
        }
    )
}
//Voeg de Route effectief toe.
BookRouteConfiguration.prototype.addRoutes = function () {
    var self = this;

    self.routeTable.push({
        requestType: 'get',
        requestUrl: '/edit_record',
        callbackFunction: function (request, response) {
            response.render('edit_record', {

            })
        }
    });

    self.routeTable.push({
        requestType: 'get',
        requestUrl: '/books',
        callbackFunction: function (request, response) {
            response.render('books', {

            })
        }
    });

    self.routeTable.push({
        requestType: 'get',
        requestUrl: '/api/getBooks',
        callbackFunction: function (request, response) {
            var bookDao = require('../server/dao/bookDao.js');
            bookDao.getAllBooks(
                function (books) {
                    response.json({
                        books: books
                    })
                });
        }
    });

    self.routeTable.push({
        requestType: 'post',
        requestUrl: '/api/books',
        callbackFunction: function (request, response) {
            console.log('DE CODE KOMT ZEKER TOT HIER');
            var bookDaoConnection = require("../server/dao/bookDao.js");
            console.log(bookDaoConnection.createBook);
            bookDaoConnection.createBook(request.body,
                function (status) {
                    response.json(status);
                    console.log("rere");
                });
        }
    });

    self.routeTable.push({
        requestType: 'get',
        requestUrl: '/book',
        callbackFunction: function (request, response) {
            response.render('book', {
                title: "Hello world, detailpagina van een boek!"
            })
        }
    });
}

module.exports = BookRouteConfiguration;