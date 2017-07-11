angular.module("bookModule").factory("bookService", bookService);

bookService.$inject = ['$http'];

function bookService($http) {
    return {
        getAllBooks: function () {
            return $http.get('https://raw.githubusercontent.com/lab9k/Krookie/master/docs/Json/Krookie.json');
        },
        getBooksAccordingToFilter: function () {
            return $http.get('https://raw.githubusercontent.com/lab9k/Krookie/master/docs/Json/Krookie.json')
        },
        storeLikes: function (like) {
            console.log(like.like);
            console.log(like.isbn);
            return $http.post('http://datahub.gent.be/input/jyvVxkPkJ8cwAZlAqN03ix0bwVy?private_key=wLNm6brbxEH7m3amKDQ4FPX3vr2&isbn=' + like.isbn + '&like=' + like.like + '');
        }
    };
}