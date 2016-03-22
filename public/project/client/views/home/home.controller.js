/**
 * Created by Aditya on 2/27/2016.
 */
(function () {
    angular
        .module("Voyager")
        .controller("HomeController", HomeController);

    function HomeController($scope, SearchService, $rootScope) {
        $scope.searchTerm;
        $scope.explorePlaces = explorePlaces;
        $scope.imageSize = "/800X500/";
        $scope.initMap = initMap;

        explorePlaces("Boston");

        function explorePlaces(searchTerm) {
            SearchService.explorePlace(searchTerm, function (places) {
                $rootScope.results = places.response.groups[0].items;
                initMap(places.response.groups[0].items);
            })
        }

        function initMap(myitems) {
            var bounds = new google.maps.LatLngBounds();
            var map = new google.maps.Map(document.getElementById('map'), {
                //zoom: 4,
                //center: myLatLng
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            for (i = 0; i < myitems.length; i++) {
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