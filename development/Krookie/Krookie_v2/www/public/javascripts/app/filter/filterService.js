angular.module("filterModule").factory("filterService", filterService);

filterService.$inject = ["$http"];
console.log("filterService wordt gelezen");

function filterService($http) {
    return {
        model: {
            category: '',
            readingskill: ''
        },

        storeCategory: function(category) {
            window.localStorage.category = angular.toJson(category)
        },
        storeReadingskill: function(readingskill) {
            window.localStorage.readingskill = angular.toJson(readingskill)
        }
    }   
}