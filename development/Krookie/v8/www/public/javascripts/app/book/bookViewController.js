angular.module("bookModule").controller("bookViewController", bookViewController);

bookViewController.$inject = ['$scope', 'bookService'];

function bookViewController($scope, bookService) {
    $scope.books = [];
    getBooksAccordingToFilter();
    if (window.localStorage.book != null && window.localStorage.book != "undefined") {
        var bookcover = JSON.parse(window.localStorage.book);
        $scope.chosenone = JSON.parse(window.localStorage.book);
        $scope.cover = 'http://webservices.bibliotheek.be/index.php?func=cover&ISBN=' + bookcover.ISBN + '&CDR=&EAN=&ISMN=&coversize=large';
    }

    if (window.localStorage.avatar != null || window.localStorage.book != undefined) {
        $scope.avatar = JSON.parse(window.localStorage.avatar);
    }

    function getBooksAccordingToFilter() {
        bookService.getBooksAccordingToFilter()
            .then(function (data) {
                angular.forEach(data.data.books_has_category, function (value, key) {
                    if (JSON.stringify(value.category_id) == window.localStorage.category) {
                        var bookId = value.book_id;
                        angular.forEach(data.data.books_has_readingskill, function (value, key) {
                            if (JSON.stringify(value.readingskill_id) == window.localStorage.readingskill) {
                                if (value.book_id == bookId) {
                                    angular.forEach(data.data.books, function (value, key) {
                                        if (value.id == bookId) {
                                            $scope.books.push(value);
                                        }
                                    })
                                }
                            }
                        })
                    }
                })

            })
    }
    $scope.randomizeArray = function () {
        window.localStorage.book = JSON.stringify($scope.books[Math.floor(Math.random() * $scope.books.length)]);        
    }
}