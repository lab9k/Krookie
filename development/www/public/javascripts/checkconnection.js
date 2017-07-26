function checkConnection() {
    var networkState = navigator.connection && navigator.connection.type;

    setTimeout(function () {

        var states = {};
        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WiFi connection';
        states[Connection.CELL_2G] = 'Cell 2G connection';
        states[Connection.CELL_3G] = 'Cell 3G connection';
        states[Connection.CELL_4G] = 'Cell 4G connection';
        states[Connection.CELL] = 'Cell generic connection';
        states[Connection.NONE] = 'No network connection';

        if (networkState != 'wifi') {
            alert(states[networkState]);
            navigator.app.exitApp();
        }
    }, 500);
}
checkConnection();