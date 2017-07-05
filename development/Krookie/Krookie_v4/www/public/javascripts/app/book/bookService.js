angular.module("bookModule").factory("bookService", bookService);

bookService.$inject = ['$http'];

function bookService($http) {
    return {
        createBook: function (book) {
            return $http.post('/api/books', {
                author: book.author,
                title: book.title,
                fact: "Dit is een leuk weetje, moet van API komen.",
                likes: 69,
                cover: "https://bin.snmmd.nl/m/pury7d5ws8ar.jpg"
            });
        },

        getAllBooks: function () {
            return $http.get('https://gist.githubusercontent.com/brendero/14234947e3e30ca37a67de9a2a1e79bf/raw/f91dcfc7b9372b778c1e1ab9baa1e154e7e7093c/Krookie.json');
        },
        getBooksAccordingToFilter: function() {
            return $http.get('https://gist.githubusercontent.com/brendero/14234947e3e30ca37a67de9a2a1e79bf/raw/f91dcfc7b9372b778c1e1ab9baa1e154e7e7093c/Krookie.json')
        }
    };
}