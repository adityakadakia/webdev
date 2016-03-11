/**
 * Created by Aditya on 2/27/2016.
 */
(function () {
    angular
        .module("Voyager")
        .controller("DetailsController", DetailsController);

    function DetailsController($routeParams, $scope, $rootScope, SearchService) {
        var id = $routeParams.id;
        var results = $rootScope.results;
        for (i in results) {
            if (results[i].venue.id == id)
                $scope.item = results[i];
        }

        initMap();
        function initMap() {
            var bounds = new google.maps.LatLngBounds();
            console.log("details: initMap");
            var myLatLng = {lat: $scope.item.venue.location.lat, lng: $scope.item.venue.location.lng};

            var map = new google.maps.Map(document.getElementById('details-map'), {
                zoom: 13,
                center: myLatLng
            });

            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
            });

            bounds.extend(marker.getPosition());
            //map.fitBounds(bounds);
        }
    }
})();