cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.unarin.cordova.beacon/www/lib/underscore-min-1.6.js",
        "id": "com.unarin.cordova.beacon.underscorejs",
        "pluginId": "com.unarin.cordova.beacon",
        "runs": true
    },
    {
        "file": "plugins/com.unarin.cordova.beacon/www/lib/q.min.js",
        "id": "com.unarin.cordova.beacon.Q",
        "pluginId": "com.unarin.cordova.beacon",
        "runs": true
    },
    {
        "file": "plugins/com.unarin.cordova.beacon/www/LocationManager.js",
        "id": "com.unarin.cordova.beacon.LocationManager",
        "pluginId": "com.unarin.cordova.beacon",
        "merges": [
            "cordova.plugins"
        ]
    },
    {
        "file": "plugins/com.unarin.cordova.beacon/www/Delegate.js",
        "id": "com.unarin.cordova.beacon.Delegate",
        "pluginId": "com.unarin.cordova.beacon",
        "runs": true
    },
    {
        "file": "plugins/com.unarin.cordova.beacon/www/model/Region.js",
        "id": "com.unarin.cordova.beacon.Region",
        "pluginId": "com.unarin.cordova.beacon",
        "runs": true
    },
    {
        "file": "plugins/com.unarin.cordova.beacon/www/Regions.js",
        "id": "com.unarin.cordova.beacon.Regions",
        "pluginId": "com.unarin.cordova.beacon",
        "runs": true
    },
    {
        "file": "plugins/com.unarin.cordova.beacon/www/model/CircularRegion.js",
        "id": "com.unarin.cordova.beacon.CircularRegion",
        "pluginId": "com.unarin.cordova.beacon",
        "runs": true
    },
    {
        "file": "plugins/com.unarin.cordova.beacon/www/model/BeaconRegion.js",
        "id": "com.unarin.cordova.beacon.BeaconRegion",
        "pluginId": "com.unarin.cordova.beacon",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-native-transitions/www/nativetransitions.js",
        "id": "cordova-plugin-native-transitions.NativeTransitions",
        "pluginId": "cordova-plugin-native-transitions",
        "clobbers": [
            "nativetransitions"
        ]
    },
    {
        "file": "plugins/com.telerik.plugins.nativepagetransitions/www/NativePageTransitions.js",
        "id": "com.telerik.plugins.nativepagetransitions.NativePageTransitions",
        "pluginId": "com.telerik.plugins.nativepagetransitions",
        "clobbers": [
            "window.plugins.nativepagetransitions"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.unarin.cordova.beacon": "3.4.1",
    "cordova-plugin-whitelist": "1.3.2",
    "cordova-plugin-native-transitions": "0.2.3",
    "com.telerik.plugins.nativepagetransitions": "0.6.5"
}
// BOTTOM OF METADATA
});