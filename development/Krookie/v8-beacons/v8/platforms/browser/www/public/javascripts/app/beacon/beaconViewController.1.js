angular.module("bookModule").controller("beaconViewController", beaconViewController);

beaconViewController.$inject = ['$scope', 'beaconService'];

function beaconViewController($scope, beaconService) {
    var app = (function () {
        // Application object.
        var app = {};

        var regions = [];
        getAllBeacons();
        var beacons = {};
        var updateTimer = null;

        app.initialize = function () {
            document.addEventListener(
                'deviceready',
                function () {
                    onDeviceReady()
                },
                false);
        };

        function onDeviceReady() {
            window.locationManager = cordova.plugins.locationManager;
            startScan();
            updateTimer = setInterval(updateTemperature, 1000);
        }

        function startScan() {
            var delegate = new locationManager.Delegate();
            // Called continuously when ranging beacons.
            delegate.didRangeBeaconsInRegion = function (pluginResult) {
                for (var i in pluginResult.beacons) {
                    var beacon = pluginResult.beacons[i];
                    var key = beacon.uuid + ':' + beacon.major + ':' + beacon.minor;
                    beacons[key] = beacon;
                }
            };
            locationManager.setDelegate(delegate);
            locationManager.requestAlwaysAuthorization();

            // Start monitoring and ranging beacons.
            for (var i in regions) {
                var beaconRegion = new locationManager.BeaconRegion(
                    i + 1,
                    regions[i].main);

                // Start ranging.
                locationManager.startRangingBeaconsInRegion(beaconRegion)
                    .fail(console.error)
                    .done();
            }
        }

        function updateTemperature() {
            var timeNow = Date.now();
            //Deze functie wordt 1x per seconde uitgevoerd dus zal steeds elke seconde gemiddelde resetten 
            //Zo zullen de waarden hopelijk fluctueren.
            // Update beacon list.
            $.each(beacons, function (key, beacon) {
                if (key == beacon.key)
                    alert(JSON.stringify(beacon));
                if (beacon.rssi < -85) {
                    changeColor(
                        "M6.6,47.8V29.4c0.3-1.2,1.4-2,2.6-1.7c0.8,0.2,1.5,0.8,1.7,1.7v18.4",
                        "red-fill orange-fill shake", "blue-fill",
                        "background--green background--red background--orange",
                        "background--darkblue",
                        "Brrrr, het is hier koud...",
                        "hidden");
                } else if (beacon.rssi > -70) {
                    changeColor(
                        "M6.63,47.7V14A2.25,2.25,0,0,1,11,14V47.7",
                        "blue-fill orange-fill", "red-fill shake",
                        "background--green background--darkblue background--orange",
                        "background--red",
                        "Je bent dichtbij!",
                        "visible");
                } else if (beacon.rssi < -70 && beacon.rssi > -85) {
                    changeColor(
                        "M6.63,47.7V21.58a2.25,2.25,0,0,1,4.4,0V47.7",
                        "red-fill orange-fill shake",
                        "orange-fill",
                        "background--green background--red background--darkblue",
                        "background--orange",
                        "Bijna, je bent niet verraf.",
                        "hidden");
                }
                var element = $('<span>' + beacon.rssi + '</span>');
                var averageBeaconsText = $('<span>' + averageBeacons[0] + '</span>');
                // $('#found-beacons').empty();
                $('#found-beacons').append(averageBeaconsText);

            });
        }

        function changeColor(SvgCoordinates, ColorsToRemove, ColorToAdd, BackgroundToDelete, BackgroundToAdd, Message, VisibilityStatus) {
            $('#inside')[0].setAttribute("d", SvgCoordinates);
            $('#background--effect').removeClass(BackgroundToDelete);
            $('.thermo').removeClass(ColorsToRemove).addClass(ColorToAdd);
            $('#background--effect').addClass('background--effect').addClass(BackgroundToAdd);
            $('.avatar__text p').html(Message);
            $('.gevonden__button').css("visibility", VisibilityStatus);
        }

        function getAllBeacons() {
            beaconService.getAllBeacons()
                .then(
                    function (data) {
                        angular.forEach(data.data.books, function (value, key) {
                            var currentBook = JSON.parse(window.localStorage.book);
                            if (JSON.stringify(value.id) == JSON.stringify(currentBook.id)) {
                                var mainBeacon = {
                                    uuid: value.beacon.main
                                };
                                var surroundingBeacons = value.beacon.surrounding;
                                regions.push(mainBeacon);
                                for (var i = 0; i < surroundingBeacons.length; i++) {
                                    var surroundingBeacon = {
                                        uuid: surroundingBeacons[i]
                                    };
                                    regions.push(surroundingBeacon);
                                }
                            }
                        })
                    }
                )
        }
        console.log(regions);
        return app;
    })();

    app.initialize();
}