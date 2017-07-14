angular.module("bookModule").controller("likeController", likeController);

likeController.$inject = ['$scope', 'bookService'];

function likeController($scope, bookService) {
    if (window.localStorage.book != null && window.localStorage.book != "undefined") {
        var ISBN = JSON.parse(window.localStorage.book);
    }

    $scope.like = {
        'like': 'true',
        'isbn': ISBN.ISBN
    };

    $scope.storeLike = function () {
        bookService.storeLikes($scope.like)

    }
}