/**
 * Created by Aditya on 2/27/2016.
 */
"use strict";
(function () {
    angular
        .module("Voyager")
        .controller("HomeController", HomeController);

    function HomeController(SearchService, $routeParams, $location, $rootScope) {
        var model = this;
        model.searchTerm;
        model.explorePlaces = explorePlaces;
        model.imageSize = "/800X500/";
        model.initMap = initMap;

        if ($routeParams.placeQuery) {
            explorePlaces($routeParams.placeQuery);
        } else {
            explorePlaces("Boston");
        }

        function explorePlaces(searchTerm) {
            SearchService.explorePlace(searchTerm, function (places) {
                $rootScope.results = places.response.groups[0].items;
                initMap(places.response.groups[0].items);
            })
            model.searchTerm = searchTerm;
            $location.url("/home/" + searchTerm);
        }

        function initMap(myitems) {
            var bounds = new google.maps.LatLngBounds();
            var map = new google.maps.Map(document.getElementById('map'), {
                //zoom: 4,
                //center: myLatLng
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            for (var i = 0; i < myitems.length; i++) {
                var marker = new google.maps.Marker({
                    position: {lat: myitems[i].venue.location.lat, lng: myitems[i].venue.location.lng},
                    map: map,
                    title: myitems[i].venue.name
                })
                bounds.extend(marker.getPosition());
            }
            map.fitBounds(bounds);
        }
    }
})();