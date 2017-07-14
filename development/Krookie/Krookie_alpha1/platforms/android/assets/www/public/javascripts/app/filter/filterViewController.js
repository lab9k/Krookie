angular.module("filterModule").controller("filterViewController", filterViewController);

filterViewController.$inject = ['$scope', 'filterService'];

function filterViewController($scope, filterService) {

    $scope.category = JSON.parse(window.localStorage.category);
    $scope.readingskill = JSON.parse(window.localStorage.readingskill);
}