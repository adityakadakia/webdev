/**
 * Created by Aditya on 4/11/2016.
 */
"use strict";
(function () {
    angular
        .module("Voyager")
        .factory("WikipediaService", WikipediaService);

    function WikipediaService($http) {

        var searchUrl = "https://rest.wikimedia.org/en.wikipedia.org/v1/page/summary/PLACE_NAME";
        var api = {
            findPlaceDescription: findPlaceDescription
        };

        return api;

        function findPlaceDescription(searchTerm) {
            var url = searchUrl.replace("PLACE_NAME", searchTerm);
            return $http.get(url);
        }
    }
})();
