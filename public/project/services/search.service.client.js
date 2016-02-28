/**
 * Created by Aditya on 2/27/2016.
 */
(function () {
    angular
        .module("Voyager")
        .factory("SearchService", SearchService);

    function SearchService($http) {

        var searchUrl = "https://api.foursquare.com/v2/venues/explore?near=_PLACE_&section=sights&venuePhotos=1&client_id=JBO2AJADGRY3AEHVPDAY3FZTLF4FW5EFVY2P2KB0DSME2EWR&client_secret=02R00R4PVZU4WXY0TJV00Q3G5IFHBGQFREWCQ3FRF0QSZNEU&v=20150403";
        var places;

        var api = {
            explorePlace: explorePlace
        };

        return api;

        function explorePlace(searchTerm, callback) {
            var url = searchUrl.replace("_PLACE_", searchTerm);
            $http
                .get(url)
                .success(callback);
        }
    }
})();
