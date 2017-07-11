var app = (function () {
    // Application object.
    var app = {};

    // Specify your beacon 128bit UUIDs here.
    var regions = [
        // Brent zijn iPhone Beacon Emulator UUID.
        {
            uuid: 'A7118AC8-D831-41FA-8AFD-93EBB85B6F1E'
        },
        // Sample UUIDs for beacons in our lab.
        {
            uuid: 'F7826DA6-4FA2-4E98-8024-BC5B71E0893E'
        },
        {
            uuid: '8DEEFBB9-F738-4297-8040-96668BB44281'
        },
        {
            uuid: 'A0B13730-3A9A-11E3-AA6E-0800200C9A66'
        },
        {
            uuid: 'E20A39F4-73F5-4BC4-A12F-17D1AD07A961'
        },
        {
            uuid: 'A4950001-C5B1-4B44-B512-1370F02D74DE'
        },
        {
            uuid: '585CDE93-1B01-42CC-9A13-25009BEDC65E'
        }, // Dialog Semiconductor.
    ];
    // Dictionary of beacons.
    var beacons = {};

    // Timer that scans beacons.
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
        // Specify a shortcut for the location manager holding the iBeacon functions.
        window.locationManager = cordova.plugins.locationManager;

        // Start tracking beacons!
        startScan();

        //Update de checker en update de thermometer
        updateTimer = setInterval(updateTemperature, 1000);
    }

    function startScan() {
        // The delegate object holds the iBeacon callback functions
        // specified below.
        var delegate = new locationManager.Delegate();

        // Called continuously when ranging beacons.
        delegate.didRangeBeaconsInRegion = function (pluginResult) {
            for (var i in pluginResult.beacons) {
                // Insert beacon into table of found beacons.
                var beacon = pluginResult.beacons[i];
                var key = beacon.uuid + ':' + beacon.major + ':' + beacon.minor;
                beacons[key] = beacon;
            }
        };

        // Set the delegate object to use.
        locationManager.setDelegate(delegate);

        // Request permission from user to access location info.
        // This is needed on iOS 8.
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

    function updateTemperature() {
        var timeNow = Date.now();
        //Deze functie wordt 1x per seconde uitgevoerd dus zal steeds elke seconde gemiddelde resetten 
        //Zo zullen de waarden hopelijk fluctueren.
        // Update beacon list.
        $.each(beacons, function (key, beacon) {
            // Only show beacons that are updated during the last 10 seconds.
            if (beacon.rssi < -85) {
                changeColor(
                    "M6.6,47.8V29.4c0.3-1.2,1.4-2,2.6-1.7c0.8,0.2,1.5,0.8,1.7,1.7v18.4",
                    "red-fill orange-fill shake", "blue-fill",
                    "background--green background--red background--orange",
                    "background--darkblue",
                    "Brrrr, het is hier koud...");
            } else if (beacon.rssi > -70) {
                changeColor(
                    "M6.63,47.7V14A2.25,2.25,0,0,1,11,14V47.7",
                    "blue-fill orange-fill", "red-fill shake",
                    "background--green background--darkblue background--orange",
                    "background--red",
                    "Je bent dichtbij!");
            } else if (beacon.rssi < -70 && beacon.rssi > -85) {
                changeColor(
                    "M6.63,47.7V21.58a2.25,2.25,0,0,1,4.4,0V47.7",
                    "red-fill orange-fill shake",
                    "orange-fill",
                    "background--green background--red background--darkblue",
                    "background--orange",
                    "Bijna, je bent niet verraf.");
            }
            var element = $('<span>' + beacon.rssi + '</span>');
            var averageBeaconsText = $('<span>' + averageBeacons[0] + '</span>');
            // $('#found-beacons').empty();
            $('#found-beacons').append(averageBeaconsText);

        });
    }

    function changeColor(SvgCoordinates, ColorsToRemove, ColorToAdd, BackgroundToDelete, BackgroundToAdd, Message) {
        $('#inside')[0].setAttribute("d", SvgCoordinates);
        $('#background--effect').removeClass(BackgroundToDelete);
        $('.thermo').removeClass(ColorsToRemove).addClass(ColorToAdd);
        $('#background--effect').addClass('background--effect').addClass(BackgroundToAdd);
        $('.avatar__text p').html(Message);
        $('.gevonden__button').css("visibility", "visible");
    }

    return app;
})();

app.initialize();