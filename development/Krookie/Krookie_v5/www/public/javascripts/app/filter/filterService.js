angular.module("filterModule").factory("filterService", filterService);

filterService.$inject = ["$http"];

function filterService($http) {
    return {
        model: {
            category: '',
            readingskill: ''
        },
        storeCategory: function (category) {
            window.localStorage.category = angular.toJson(category)
        },
        storeAvatar: function (avatar) {
            window.localStorage.avatar = angular.toJson(avatar)
        },
        storeReadingskill: function (readingskill) {
            window.localStorage.readingskill = angular.toJson(readingskill)
        }
    }
}