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

    // Background detection.
    var notificationID = 0;
    var inBackground = false;
    document.addEventListener('pause', function () {
        inBackground = true
    });
    document.addEventListener('resume', function () {
        inBackground = false
    });

    // Dictionary of beacons.
    var beacons = {};

    // Timer that displays list of beacons.
    var updateTimer = null;

    app.initialize = function () {
        document.addEventListener(
            'deviceready',
            function () {
                // evothings.scriptsLoaded(onDeviceReady),
                onDeviceReady(),
                    console.log('test this hit')
            },
            false);
        console.log("love me some ass");
    };

    function onDeviceReady() {
        // Specify a shortcut for the location manager holding the iBeacon functions.
        window.locationManager = cordova.plugins.locationManager;

        console.log("love me some boobies");
        // Start tracking beacons!
        startScan();

        // Display refresh timer.
        // updateTimer = setInterval(displayBeaconList, 500);
        //Update de checker en update de thermometer
        updateTimer = setInterval(updateTemperature, 500);
        console.log('i eat ass');
    }

    function startScan() {
        // The delegate object holds the iBeacon callback functions
        // specified below.
        var delegate = new locationManager.Delegate();


        // Called continuously when ranging beacons.
        delegate.didRangeBeaconsInRegion = function (pluginResult) {
            //console.log('didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult))
            for (var i in pluginResult.beacons) {
                // Insert beacon into table of found beacons.
                var beacon = pluginResult.beacons[i];
                beacon.timeStamp = Date.now();
                var key = beacon.uuid + ':' + beacon.major + ':' + beacon.minor;
                beacons[key] = beacon;
            }
        };

        // Called when starting to monitor a region.
        // (Not used in this example, included as a reference.)
        delegate.didStartMonitoringForRegion = function (pluginResult) {
            //console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult))
        };

        // Called when monitoring and the state of a region changes.
        // If we are in the background, a notification is shown.
        delegate.didDetermineStateForRegion = function (pluginResult) {
            if (inBackground) {
                // Show notification if a beacon is inside the region.
                // TODO: Add check for specific beacon(s) in your app.
                if (pluginResult.region.typeName == 'BeaconRegion' &&
                    pluginResult.state == 'CLRegionStateInside') {
                    cordova.plugins.notification.local.schedule({
                        id: ++notificationID,
                        title: 'Beacon in range',
                        text: 'iBeacon Scan detected a beacon, tap here to open app.'
                    });
                }
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

            // Start monitoring.
            // (Not used in this example, included as a reference.)
            locationManager.startMonitoringForRegion(beaconRegion)
                .fail(console.error)
                .done();
        }
    }

    // function displayBeaconList() {
    //     // Clear beacon list.
    //     $('#found-beacons').empty();
    //     console.log("love me some tities");
    //     var timeNow = Date.now();
    //     $('#warning').attr('style', 'background-color:red');
    //     // Update beacon list.
    //     $.each(beacons, function (key, beacon) {
    //         // Only show beacons that are updated during the last 60 seconds.
    //         if (beacon.timeStamp + 60000 > timeNow) {
    //             // Map the RSSI value to a width in percent for the indicator.
    //             var rssiWidth = 1; // Used when RSSI is zero or greater.
    //             if (beacon.rssi < -100) {
    //                 rssiWidth = 100;
    //             } else if (beacon.rssi < 0) {
    //                 rssiWidth = 100 + beacon.rssi;
    //             }

    //             // Create tag to display beacon data.
    //             var element = $(
    //                 '<li>' +
    //                 '<strong>UUID: ' + beacon.uuid + '</strong><br />' +
    //                 'Major: ' + beacon.major + '<br />' +
    //                 'Minor: ' + beacon.minor + '<br />' +
    //                 'Proximity: ' + beacon.proximity + '<br />' +
    //                 'RSSI: ' + beacon.rssi + '<br />' +
    //                 '<div style="background:rgb(255,128,64);height:20px;width:' +
    //                 rssiWidth + '%;"></div>' +
    //                 '</li>'
    //             );

    //             $('#warning').remove();
    //             $('#found-beacons').append(element);
    //         }
    //     });
    // }

    function updateTemperature() {
        var timeNow = Date.now();
        // Update beacon list.
        $.each(beacons, function (key, beacon) {
            // Only show beacons that are updated during the last 10 seconds.
            if (beacon.timeStamp + 10000 > timeNow) {
                // Map the RSSI value to a width in percent for the indicator.
                var rssiWidth = 1; // Used when RSSI is zero or greater.
                if (beacon.rssi > -50) {
                    function turnRed() {
                        //$('#inside')[0].setAttribute("d", "M1.81,12.8V5.73A.61.61,0,0,1,3,5.73V12.8");
                        $('#inside')[0].setAttribute("d", "M6.63,47.7V14A2.25,2.25,0,0,1,11,14V47.7");
                        $('#background--effect').removeClass('background--green');
                        $('#background--effect').removeClass('background--orange');
                        $('#background--effect').removeClass('background--blue');
                        $('.thermo').addClass('shake');
                        $('#background--effect').addClass('background--effect background--red');
                        $('.avatar__text p').html("Mmmm, lekker warm");
                        $('.gevonden__button').css("visibility", "visible");
                    }
                    turnRed();
                }
            }
        });
    }

    return app;
})();

app.initialize();