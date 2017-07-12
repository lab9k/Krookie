angular.module("bookModule").controller("bookViewController", bookViewController);

bookViewController.$inject = ['$scope', 'bookService'];

function bookViewController($scope, bookService) {
    $scope.books = [];
        
    if (window.localStorage.book != null && window.localStorage.book != "undefined") {
        var bookcover = JSON.parse(window.localStorage.book);
        $scope.chosenone = JSON.parse(window.localStorage.book);
        $scope.cover = 'http://webservices.bibliotheek.be/index.php?func=cover&ISBN=' + bookcover.ISBN + '&CDR=&EAN=&ISMN=&coversize=large';
    }

    if (window.localStorage.avatar != null || window.localStorage.book != undefined) {
        $scope.avatar = JSON.parse(window.localStorage.avatar);
    }
    //TODO: make scope of getBooksAccordingToFilter and call it before randomizeArray + check if statement for flaws 
    $scope.getBooksAccordingToFilter = function() {
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
                                            console.log(value);
                                            do{
                                            $scope.books.push(value);
                                            }
                                            while($scope.books.length == 0)
                                            console.log($scope.books);
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
        setTimeout(function(){
            do {
                window.localStorage.book = JSON.stringify($scope.books[Math.floor(Math.random() * $scope.books.length)]);        
            }
            while(window.localStorage.book == undefined && window.localStorage.book == null)
        }, 1000)
    }
}