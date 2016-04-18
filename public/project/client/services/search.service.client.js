/**
 * Created by Aditya on 2/27/2016.
 */
"use strict";
(function () {
    angular
        .module("Voyager")
        .factory("SearchService", SearchService);

    function SearchService($http) {

        var searchUrl = "https://api.foursquare.com/v2/venues/explore?near=_PLACE_&offset=_OFFSET_&section=sights&venuePhotos=1&client_id=JBO2AJADGRY3AEHVPDAY3FZTLF4FW5EFVY2P2KB0DSME2EWR&client_secret=02R00R4PVZU4WXY0TJV00Q3G5IFHBGQFREWCQ3FRF0QSZNEU&v=20150403";
        var venueUrl = "https://api.foursquare.com/v2/venues/_VENUEID_?oauth_token=EKK43N14I2JFS30PI1BYZYSUTU3RLUL5RBXIDQ12BXJDSQHA&v=20160410"
        var places;
        var api = {
            explorePlace: explorePlace,
            findPlaceDetailsByPlaceId: findPlaceDetailsByPlaceId
        };

        return api;


        function explorePlace(searchTerm, offset, callback) {
            var url = searchUrl.replace("_PLACE_", searchTerm);
            url = url.replace("_OFFSET_", offset);
            $http
                .get(url)
                .success(callback);
        }

        function findPlaceDetailsByPlaceId(venueId, callback) {
            var url = venueUrl.replace("_VENUEID_", venueId);
            return $http.get(url);
        }
    }
})();
