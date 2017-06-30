angular.module("bookModule").controller("bookViewController", bookViewController);

bookViewController.$inject = ['$scope', 'bookService'];

function bookViewController($scope, bookService) {
    $scope.books = [];

    getAllBooks();

    function getAllBooks() {
        bookService.getAllBooks().
        then(function (data) {
            if (data && data.data.books && data.data.books.length > 0) {

                $scope.books = data.data.books;
                console.log($scope.books);

            }
        })
    }
}