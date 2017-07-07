angular.module("bookModule").factory("bookService", bookService);

bookService.$inject = ['$http'];

function bookService($http) {
    return {
        getAllBooks: function () {
            return $http.get('https://gist.githubusercontent.com/brendero/14234947e3e30ca37a67de9a2a1e79bf/raw/10092a414fdeedec1ecaf199654dcfba7728edf4/Krookie.json');
        },
        getBooksAccordingToFilter: function () {
            return $http.get('https://gist.githubusercontent.com/brendero/14234947e3e30ca37a67de9a2a1e79bf/raw/10092a414fdeedec1ecaf199654dcfba7728edf4/Krookie.json')
        }
    };
}