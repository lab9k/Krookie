cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "com.unarin.cordova.beacon.underscorejs",
        "file": "plugins/com.unarin.cordova.beacon/www/lib/underscore-min-1.6.js",
        "pluginId": "com.unarin.cordova.beacon",
        "runs": true
    },
    {
        "id": "com.unarin.cordova.beacon.Q",
        "file": "plugins/com.unarin.cordova.beacon/www/lib/q.min.js",
        "pluginId": "com.unarin.cordova.beacon",
        "runs": true
    },
    {
        "id": "com.unarin.cordova.beacon.LocationManager",
        "file": "plugins/com.unarin.cordova.beacon/www/LocationManager.js",
        "pluginId": "com.unarin.cordova.beacon",
        "merges": [
            "cordova.plugins"
        ]
    },
    {
        "id": "com.unarin.cordova.beacon.Delegate",
        "file": "plugins/com.unarin.cordova.beacon/www/Delegate.js",
        "pluginId": "com.unarin.cordova.beacon",
        "runs": true
    },
    {
        "id": "com.unarin.cordova.beacon.Region",
        "file": "plugins/com.unarin.cordova.beacon/www/model/Region.js",
        "pluginId": "com.unarin.cordova.beacon",
        "runs": true
    },
    {
        "id": "com.unarin.cordova.beacon.Regions",
        "file": "plugins/com.unarin.cordova.beacon/www/Regions.js",
        "pluginId": "com.unarin.cordova.beacon",
        "runs": true
    },
    {
        "id": "com.unarin.cordova.beacon.CircularRegion",
        "file": "plugins/com.unarin.cordova.beacon/www/model/CircularRegion.js",
        "pluginId": "com.unarin.cordova.beacon",
        "runs": true
    },
    {
        "id": "com.unarin.cordova.beacon.BeaconRegion",
        "file": "plugins/com.unarin.cordova.beacon/www/model/BeaconRegion.js",
        "pluginId": "com.unarin.cordova.beacon",
        "runs": true
    },
    {
        "id": "cordova-plugin-native-transitions.NativeTransitions",
        "file": "plugins/cordova-plugin-native-transitions/www/nativetransitions.js",
        "pluginId": "cordova-plugin-native-transitions",
        "clobbers": [
            "nativetransitions"
        ]
    },
    {
        "id": "com.telerik.plugins.nativepagetransitions.NativePageTransitions",
        "file": "plugins/com.telerik.plugins.nativepagetransitions/www/NativePageTransitions.js",
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
};
// BOTTOM OF METADATA
});