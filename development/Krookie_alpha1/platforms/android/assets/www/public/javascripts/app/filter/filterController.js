angular.module("bookModule").controller("filterController", filterController);

filterController.$inject = ['$scope', 'filterService'];

function filterController($scope, filterService) {

    $scope.storeCategory = function () {
        $scope.category = document.querySelector(".swiper-slide-active").getAttribute("value");
        $scope.avatar = document.querySelector(".swiper-slide-active .selected_avatar").getAttribute("src");
        if ($scope.category != '') {
            filterService.storeCategory($scope.category),
                filterService.storeAvatar($scope.avatar)
        }
    };
    $scope.storeReadingskill = function (readingskill) {
        $scope.readingskill = readingskill;

        if ($scope.readingskill != '') {
            filterService.storeReadingskill($scope.readingskill);
        }

    };

}