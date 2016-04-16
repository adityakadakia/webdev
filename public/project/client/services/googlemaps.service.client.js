/**
 * Created by Aditya on 4/16/2016.
 */
"use strict";
(function () {
    angular
        .module("Voyager")
        .factory("GoogleMapsService", GoogleMapsService);

    function GoogleMapsService($http) {

        var api = {
            reverseGeocode: reverseGeocode
        };
        return api;

        function reverseGeocode(latlon) {
            var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + latlon;
            return $http.get(url);
        }
    }

})();
