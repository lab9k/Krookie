angular.module("filterModule").controller("filterController", filterController);

filterController.$inject = ['$scope', 'filterService'];

function filterController($scope, filterService) {

    $scope.storeCategory = function () {
        $scope.category = {
            category: document.querySelector(".swiper-slide-active").getAttribute("value")
        };
        if($scope.category != '') {
            filterService.storeCategory($scope.category)
        }
    };
    $scope.storeReadingskill = function(readingskill) {
        $scope.readingskill = {
            readingskill: document.querySelector(".swiper-slide-active").getAttribute("value")
        };

        if(readingskill != '') {
            filterService.storeReadingskill(readingskill)
        }
    
    };
    
}