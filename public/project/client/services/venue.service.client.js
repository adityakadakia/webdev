/**
 * Created by Aditya on 4/10/2016.
 */
"use strict";
(function () {

    angular
        .module("Voyager")
        .factory("VenueService", VenueService);

    function VenueService($http) {

        var api = {
            findAllVenues: findAllVenues,
            findVenueByFoursquareId: findVenueByFoursquareId,
            addVenue: addVenue
        };

        return api;

        function findAllVenues() {
            return $http.get("/api/project/venue/");
        }

        function findVenueByFoursquareId(foursquareId) {
            return $http.get("/api/project/venue/" + foursquareId);
        }

        function addVenue(foursquareId, venue) {
            return $http.post("/api/project/venue/" + foursquareId, venue);
        }
    }
})();