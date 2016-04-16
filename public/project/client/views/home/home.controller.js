/**
 * Created by Aditya on 2/27/2016.
 */
"use strict";
(function () {
    angular
        .module("Voyager")
        .controller("HomeController", HomeController);

    function HomeController(SearchService, $routeParams, $location, $rootScope, GoogleMapsService) {
        var model = this;
        model.searchTerm;
        model.explorePlaces = explorePlaces;
        model.imageSize = "/800X500/";
        model.initMap = initMap;
        model.changeUrl = changeUrl;

        if ($routeParams.placeQuery) {
            explorePlaces($routeParams.placeQuery);
        } else {
            getLocation();
        }

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }

        function showPosition(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            console.log("Lat: " + lat + "Lon: " + lon);
            reverseGeocode(lat, lon);
        }

        function reverseGeocode(lat, lon) {
            GoogleMapsService
                .reverseGeocode(lat + "," + lon)
                .then(function (place) {
                        var city = place.data.results[3].formatted_address;
                        console.log(city);
                        if (city) {
                            $location.url('/home/' + city).replace();
                        }
                        else {
                            $location.url('/home/' + 'Boston').replace();
                        }
                    },
                    function (error) {
                        console.log(error);
                    });
        }

        function explorePlaces(searchTerm) {
            console.log("searchTerm: " + searchTerm);
            SearchService.explorePlace(searchTerm, function (places) {
                $rootScope.results = places.response.groups[0].items;
                initMap(places.response.groups[0].items);
            })
            model.searchTerm = searchTerm;

        }

        function changeUrl(searchTerm) {
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