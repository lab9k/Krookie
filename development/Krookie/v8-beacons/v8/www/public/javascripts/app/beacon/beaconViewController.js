angular.module("bookModule").controller("beaconViewController", beaconViewController);

beaconViewController.$inject = ['$scope', 'beaconService'];

function beaconViewController($scope, beaconService) {
    var app = (function () {
        // Application object.
        var app = {};
        // We definieren wat globale variabelen.
        var regions = [];
        var surroundingBeacons = [];
        var mainBeacon = {};
        // We nemen de beacons uit de JSON file dat horen bij het boek. 
        // Maken een onderscheid tussen mainBeacons en surroundingBeacons
        getAllBeacons();
        //We definieren nog globale variabelen.
        var beacons = {};
        var beaconsArray = [];
        var updateTimer = null;
        var normalisationStack = [];

        // We zullen alle functies hier alleen maar uitvoeren als device ready is.
        app.initialize = function () {
            document.addEventListener(
                'deviceready',
                //Plugin inladen, scannen, relevante beacons in beaconsArray steken en de temperatuur elke seconde updaten.
                onDeviceReady,
                false);
        };

        function onDeviceReady() {
            // We laden de iBeacon Plugin in.
            window.locationManager = cordova.plugins.locationManager;
            // We beginnen te scannen naar beacons in de buurt dat horen bij het gekozen boek.
            startScan();
            // We maken beaconsArray dat een Array is van objecten. 
            // (beacons is een object van objecten waar elk objectje de info is van al de beacons dat gemeten worden en in de region worden gespecifieerd.)
            beaconsArray = Object.values(beacons);
            // Elke seconde updateTemperature uitvoeren.
            updateTimer = setInterval(updateTemperature, 1000);
        }

        function startScan() {
            var delegate = new locationManager.Delegate();
            // Called continuously when ranging beacons.
            delegate.didRangeBeaconsInRegion = function (pluginResult) {
                // Voor elke beacon dat de plugin leest gaan we..
                for (var i in pluginResult.beacons) {
                    // Eén beacon opslaan in een variabele
                    var beacon = pluginResult.beacons[i];
                    // Een unieke key maken.
                    var key = beacon.uuid + ':' + beacon.major + ':' + beacon.minor;
                    // De beacon toevoegen aan het beacons object
                    beacons[key] = beacon;
                    // Als er al 30 items zijn in de beaconsArray..
                    if (beaconsArray.length > 30) {
                        // Maak de beaconsArray weer kleiner
                        // Houdt laatste 24 objecten.
                        beaconsArray = beaconsArray.slice(beaconsArray.length - 30, beaconsArray.length);
                    }
                    // Zolang er minder dan 30 objecten in de array zitten blijf er metingen aan toevoegen.
                    beaconsArray.push(beacon);
                }
            };
            locationManager.setDelegate(delegate);
            locationManager.requestAlwaysAuthorization();

            // Voor elke UUID in de regionsArray..
            for (var i in regions) {
                // laten we weten aan de plugin wat de beaconRegion is.
                var beaconRegion = new locationManager.BeaconRegion(
                    i + 1,
                    regions[i].uuid);

                // Start ranging.
                locationManager.startRangingBeaconsInRegion(beaconRegion)
                    .fail(console.error)
                    .done();
            }
        }


        // Deze functie wordt 1x per seconde uitgevoerd dus dankzij de normalize en average functies zal er elke seconde een nieuw gemiddelde worden berekend 
        // In de normalize functie 
        function updateTemperature() {
            var timeNow = Date.now();
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

        function normalizeBeaconsArray() {
            /**
             * beaconsArray zijn al de beacons van de laatste 3 sec.
             * het is een Array met vele objecten en elk object heeft info over een beacon (uuid, rssi etc)
             * Ons doel is nu een nieuw object maken waar we voor elke uuid alle metingingen erin plaatsen
             * Van al deze polls/metingen van een bepaalde beacon bereken we later een gemiddelde rssi value om zo de dichtste beacon te bepalen.
             * Het nieuw object (pollsPerBeacon) moet er zo uitzien:
             * { 
             * "uuid1":[polls van beacon1],
             * "uuid2":[polls van beacon2],
             * ...
             *  }
             *  We nemen het gemiddelde van 'polls van beacon1' en vergelijken dit met 'polls van beacon2'
             */
            // We maken een pollsPerBeacon object waar de metingen inzitten volgens uuid.
            var pollsPerBeacon = {};

            // Voor elk object (ontvangen beaconsignaal) van voorbije 3 seconden gaan we..
            for (var i = 0; i < beaconsArray.length; i++) {
                //Een unieke key gebruiken
                var localKey = 'BeaconMetUUID:' + beaconsArray[i].uuid;
                //Kijken of die Key al bestaat in dit object en zo ja voegen we de huidige rssi toe aan de array horende bij de key/beacon
                //Zo neen maken we een nieuwe key en voegen daar een array aan toe met de rssi waarde
                if (pollsPerBeacon.hasOwnProperty(localKey)) {
                    pollsPerBeacon[localKey].push(beaconsArray[i].rssi);
                } else {
                    pollsPerBeacon[localKey] = [beaconsArray[i].rssi];
                }
            }
            alert(JSON.stringify(pollsPerBeacon));
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
        return app;
    })();
    app.initialize();
}