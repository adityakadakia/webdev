"use strict";
(function () {

    angular
        .module("Voyager")
        .factory("ReviewService", ReviewService);

    function ReviewService($http) {

        var api = {
            findAllReviewsByPlaceId: findAllReviewsByPlaceId,
            addReview: addReview,
            updateReview: updateReview,
            deleteReview: deleteReview
        };

        return api;

        function findAllReviewsByPlaceId(placeId) {
            return $http.get("/api/project/review/" + placeId);
        }

        function addReview(review, placeId) {
            return $http.post("/api/project/review/" + placeId, review);
        }

        function updateReview(review) {
            return $http.put("/api/project/review/" + review._id, review);
        }

        function deleteReview(reviewId) {
            return $http.delete("/api/project/review/" + reviewId);
        }
    }

})();