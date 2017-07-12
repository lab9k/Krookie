angular.module("bookModule").factory("bookService", bookService);

bookService.$inject = ['$http'];

function bookService($http) {
    return {
        getBooksAccordingToFilter: function () {
            return $http.get('https://raw.githubusercontent.com/lab9k/Krookie/master/docs/Json/Krookie.json')
        },
        storeLikes: function (like) {
            return $http.post('http://datahub.gent.be/input/jyvVxkPkJ8cwAZlAqN03ix0bwVy?private_key=wLNm6brbxEH7m3amKDQ4FPX3vr2&isbn='+ like.isbn +'&like='+ like.like +'');
        }
    };
}