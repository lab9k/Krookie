angular.module("bookModule").factory("bookService", bookService);

bookService.$inject = ['$http'];

function bookService($http) {
    return {
        getAllBooks: function () {
            return $http.get('https://gist.githubusercontent.com/brendero/14234947e3e30ca37a67de9a2a1e79bf/raw/f91dcfc7b9372b778c1e1ab9baa1e154e7e7093c/Krookie.json');
        },
        getBooksAccordingToFilter: function () {
            return $http.get('https://gist.githubusercontent.com/brendero/14234947e3e30ca37a67de9a2a1e79bf/raw/f91dcfc7b9372b778c1e1ab9baa1e154e7e7093c/Krookie.json')
        }
    };
}