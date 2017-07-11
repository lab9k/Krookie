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
        var updateStack = null;

        var normalisationStack = [];


        app.initialize = function () {
            document.addEventListener(
                'deviceready',
                onDeviceReady,
                false);
        };

        function onDeviceReady() {
            window.locationManager = cordova.plugins.locationManager;
            startScan();

            beaconsArray = Object.values(beacons);
            // updateStack = setInterval(collectValues, 100);
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
                    if (beaconsArray.length > 30) {
                        beaconsArray = beaconsArray.slice(10, beaconsArray.length);
                    }
                    beaconsArray.push(beacon);


                }
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

        /*  function collectValues() {
              var timeNow = Date.now();

              if (beaconsArray.length > 30) {
                  beaconsArray = beaconsArray.slice(10, beaconsArray.length);
              }

              $.each(beacons, function (key, beacon) {
                  beaconsArray.push(beacon);
              });
          }*/

        function normalizeBeaconsArray() {
            /**
             * beaconsArray is beacons van de laatste 3 sec.
             * {"uuid":[polls van beacon],
             * "uuid":[polls van beacon2],
             * ...
             *  }
             */
            var pollsPerBeacon = {};

            //alert(JSON.stringify(beaconsArray));
            for (var i = 0; i < beaconsArray.length; i++) {
                var localKey = beaconsArray[i].uuid + ':' + beaconsArray[i].major + ':' + beaconsArray[i].minor;
                if (pollsPerBeacon.hasOwnProperty(localKey)) {
                    pollsPerBeacon[localKey].push(beaconsArray[i]);
                } else {
                    pollsPerBeacon[localKey] = [beaconsArray[i]];
                }
            }
            console.log(pollsPerBeacon, beaconsArray);
            averageValue(pollsPerBeacon);
             //delete pollsPerBeacon["undefined:undefined:undefined"];

            //alert("pollsPerBeacon: ", JSON.stringify(pollsPerBeacon));
        }

        function averageValue(arr) {
            var sums = {},
                counts = {},
                allAverageValues = [],
                rssi;
            for (var i = 0; i < arr.length; i++) {
                rssi = arr[i].rssi;
                if (!(rssi in sums)) {
                    sums[rssi] = 0;
                    counts[rssi] = 0;
                }
                sums[rssi] += arr[i].value;
                counts[rssi]++;
            }

            for (rssi in sums) {
                allAverageValues.push({
                    rssiValue: rssi,
                    value: sums[rssi] / counts[rssi]
                });
            }
            console.log(allAverageValues);
        }

        function updateTemperature() {
            var timeNow = Date.now();
            //Deze functie wordt 1x per seconde uitgevoerd dus zal steeds elke seconde gemiddelde resetten 
            //Zo zullen de waarden hopelijk fluctueren.
            // Update beacon list.

            //returns closest beacon
            var closest = normalizeBeaconsArray();

            /* Array.prototype.hasMax = function (attrib) {
                 return this.reduce(function (prev, curr) {
                     return prev[attrib] > curr[attrib] ? prev : curr;
                 });
             };
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
                 angular.forEach(surroundingBeacons, function (value, key) {
                     if (JSON.stringify(value.toLowerCase()) == JSON.stringify(beaconsArray.hasMax('rssi').uuid.toLowerCase())) {
                         changeColor(
                             "M6.63,47.7V21.58a2.25,2.25,0,0,1,4.4,0V47.7",
                             "red-fill blue-fill shake",
                             "orange-fill",
                             "background--green background--red background--darkblue",
                             "background--orange",
                             "Bijna, je bent niet verraf.",
                             "hidden");
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
                 });
             }
             var element = $('<p>Waarde van dichtsbijzijnde beacon: ' + JSON.stringify(beaconsArray.hasMax('rssi').rssi) + '<br>UUID van de current beacon: ' + JSON.stringify(beaconsArray.hasMax('rssi').uuid) + '</span>');
             $('#found-beacons').empty();
             $('#found-beacons').append(element);*/
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
                                };
                                surroundingBeacons = value.beacon.surrounding;
                                console.log('This is the main beacon:' + mainBeacon.uuid);
                                regions.push(mainBeacon);
                                for (var i = 0; i < surroundingBeacons.length; i++) {
                                    console.log('These are the surrounding beacons:' + surroundingBeacons[i]);
                                    var surroundingBeacon = {
                                        uuid: surroundingBeacons[i]
                                    };
                                    regions.push(surroundingBeacon);
                                }
                            }
                        });
                    }
                );
        }

        return app;
    })();
    app.initialize();
}