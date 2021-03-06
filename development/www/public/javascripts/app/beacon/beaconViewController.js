angular.module("bookModule").controller("beaconViewController", beaconViewController);

beaconViewController.$inject = ['$scope', 'beaconService'];

function beaconViewController($scope, beaconService) {
    var app = (function () {
        // Application object.
        var app = {};

        var regions = [];
        var surroundingBeacons = [];
        var mainBeacon = {};
        getAllBeacons();
        var beacons = {};
        var beaconsArray = [];
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
            cordova.plugins.locationManager.isBluetoothEnabled()
                .then(function (isEnabled) {
                    if (isEnabled) {
                        console.log("Bluetooth is enabled.");
                    } else {
                        cordova.plugins.locationManager.enableBluetooth();
                    }
                })
                .fail(function (e) {
                    console.error(e);
                })
                .done();
            startScan();
            setInterval(updateTemperature, 500);
        }

        function startScan() {
            var delegate = new locationManager.Delegate();
            // Called continuously when ranging beacons.
            delegate.didRangeBeaconsInRegion = function (pluginResult) {
                for (var i in pluginResult.beacons) {
                    var beacon = pluginResult.beacons[i];
                    beacon.timeStamp = Date.now();
                    var key = beacon.uuid + ':' + beacon.major + ':' + beacon.minor;
                    beacons[key] = beacon;
                }
                stopScan();
            };

            locationManager.setDelegate(delegate);
            locationManager.requestAlwaysAuthorization();

            // Start monitoring and ranging beacons.
            for (var i in regions) {
                var beaconRegion = new locationManager.BeaconRegion(
                    i + 1,
                    regions[i].uuid);

                // Start ranging.
                locationManager.startRangingBeaconsInRegion(beaconRegion)
                    .fail(console.error)
                    .done();
            }
        }

        function stopScan() {

        }

        function updateTemperature() {
            var timeNow = Date.now();

            $.each(beacons, function (key, beacon) {
                if (beacon.timeStamp + 3000 > timeNow) {
                    if (JSON.stringify(beacon) != undefined) {
                        beaconsArray.push(beacon);
                    }
                }
            });

            console.log('beaconsObject: ' + JSON.stringify(beacons));
            console.log('beaconsArray: ' + JSON.stringify(beaconsArray));

            Array.prototype.hasMax = function (attrib) {
                return this.reduce(function (prev, curr) {
                    return prev[attrib] > curr[attrib] ? prev : curr;
                }, -Infinity);
            }

            if (beaconsArray !== 'undefined' && beaconsArray.length > 0) {
                if (JSON.stringify(beaconsArray.hasMax('rssi').uuid).toLowerCase() == JSON.stringify(mainBeacon.uuid).toLowerCase()) {
                    changeColor(
                        "M6.63,47.7V14A2.25,2.25,0,0,1,11,14V47.7",
                        "blue-fill orange-fill",
                        "red-fill shake",
                        "background--green background--darkblue background--orange",
                        "background--red",
                        "Je bent dichtbij!",
                        "visible");
                } else {
                    for (var uuid in surroundingBeacons) {
                        if (surroundingBeacons.hasOwnProperty(uuid)) {
                            if (JSON.stringify(surroundingBeacons[uuid].toLowerCase()) == JSON.stringify(beaconsArray.hasMax('rssi').uuid.toLowerCase())) {
                                changeColor(
                                    "M6.63,47.7V21.58a2.25,2.25,0,0,1,4.4,0V47.7",
                                    "red-fill blue-fill shake",
                                    "orange-fill",
                                    "background--green background--red background--darkblue",
                                    "background--orange",
                                    "Bijna, je bent niet verraf.",
                                    "hidden");
                                break;
                            } else {
                                changeColor(
                                    "M6.6,47.8V29.4c0.3-1.2,1.4-2,2.6-1.7c0.8,0.2,1.5,0.8,1.7,1.7v18.4",
                                    "red-fill orange-fill shake",
                                    "blue-fill",
                                    "background--green background--red background--orange",
                                    "background--darkblue",
                                    "Brrrr, het is hier koud...",
                                    "hidden");
                            }
                        }
                    }
                }
            } else if (beaconsArray.length == 0) {
                changeColor(
                    "M6.6,47.8V29.4c0.3-1.2,1.4-2,2.6-1.7c0.8,0.2,1.5,0.8,1.7,1.7v18.4",
                    "red-fill orange-fill shake",
                    "blue-fill",
                    "background--green background--red background--orange",
                    "background--darkblue",
                    "Brrrr, het is hier koud...",
                    "hidden");
            }

            beaconsArray = [];
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
                                mainBeacon = {
                                    uuid: value.beacon.main
                                }
                                surroundingBeacons = value.beacon.surrounding;
                                console.log('This is the main beacon:' + mainBeacon.uuid);
                                regions.push(mainBeacon);
                                for (var i = 0; i < surroundingBeacons.length; i++) {
                                    console.log('These are the surrounding beacons:' + surroundingBeacons[i]);
                                    var surroundingBeacon = {
                                        uuid: surroundingBeacons[i]
                                    }
                                    regions.push(surroundingBeacon);
                                }
                            }
                        })
                    }
                )
        }

        return app;
    })();
    app.initialize();
}