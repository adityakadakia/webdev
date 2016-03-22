/**
 * Created by Aditya on 2/27/2016.
 */
"use strict";
(function () {
    angular
        .module("Voyager")
        .controller("DetailsController", DetailsController);

    function DetailsController($routeParams, $rootScope, SearchService, ReviewService, UserService) {
        var model = this;
        var id = $routeParams.id;
        var results = $rootScope.results;
        model.selected = -1;
        model.deleteReview = deleteReview;
        model.addReview = addReview;
        model.selectReview = selectReview;
        model.updateReview = updateReview;
        model.findFullUserNamebyUserId = findFullUserNamebyUserId;

        for (var i in results) {
            if (results[i].venue.id == id)
                model.item = results[i];
        }

        initMap();
        console.log("placeId: " + model.item.venue.id);
        findAllReviewsByPlaceId(model.item.venue.id);
        console.log(model.reviews);

        function findFullUserNamebyUserId(userId) {
            return UserService.userIdtoFullUserName(userId);
        }

        function findAllReviewsByPlaceId(placeId) {
            ReviewService.findAllReviewsByPlaceId(placeId, function (response) {
                model.reviews = response;
            });
        }

        function selectReview(index) {
            model.selected = index;
            var editReview = {
                "_id": model.reviews[index]["_id"],
                "title": model.reviews[index]["title"],
                "description": model.reviews[index]["description"],
                "timestamp": model.reviews[index]["timestamp"],
                "placeId": model.reviews[index]["placeId"],
                "userId": model.reviews[index]["userId"],
                "commentIds": model.reviews[index]["commentIds"]
            }
            model.review = editReview;
            model.editReview = editReview;
        }

        function addReview(review) {
            review.title = "";
            ReviewService.addReview(review, model.item.venue.id, function () {
                model.review = {};
                model.selected = -1;
                findAllReviewsByPlaceId(model.item.venue.id);
            });
        }

        function updateReview(review) {
            ReviewService.updateReview(review, function (newReview) {
                model.reviews[model.selected] = newReview;
                model.review = {};
                model.selected = -1;
            });
        }

        function deleteReview(index) {
            var reviewId = model.reviews[index]._id;
            ReviewService.deleteReview(reviewId, function () {
                model.review = {};
                model.selected = -1;
                findAllReviewsByPlaceId(model.item.venue.id);
            });
        }

        function initMap() {
            var bounds = new google.maps.LatLngBounds();
            console.log("details: initMap");
            var myLatLng = {lat: model.item.venue.location.lat, lng: model.item.venue.location.lng};

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