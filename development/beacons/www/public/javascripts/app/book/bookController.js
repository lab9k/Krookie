angular.module("bookModule").controller("bookController", bookController);

bookController.$inject = ['$scope', 'bookService'];

function bookController($scope, bookService) {
    $scope.book = {
        bookName: '',
        bookAuthor: '',
        bookFact: '',
        bookLikes: '',
        bookCover: ''
    };

    $scope.createBook = function (book) {
        bookService.createBook(book)
            .then(function (data) {
                alert("succesfull data posted teeeeeeeest");
            })
    }
}