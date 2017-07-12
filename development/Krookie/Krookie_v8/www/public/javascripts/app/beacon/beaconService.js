angular.module("bookModule").factory("beaconService", beaconService);

beaconService.$inject = ['$http'];

function beaconService($http) {
    return {
        getAllBeacons: function () {
            return $http.get('https://raw.githubusercontent.com/lab9k/Krookie/master/docs/Json/Krookie.json');
        }
    };
}