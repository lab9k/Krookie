var app = (
    function () {
        // Application object.
        var app = {};
        app.initialize = function () {
            document.addEventListener(
                'deviceready',
                function () {
                    cordova.plugins.BluetoothStatus.promptForBT();
                },
                false);
        };


        return app;
    }
)();

app.initialize();