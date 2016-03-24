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
        console.log("reviews: " + JSON.stringify(model.reviews));
        console.log("findFullUserNamebyUserId 123: " + findFullUserNamebyUserId(123));

        function findFullUserNamebyUserId(userId) {
            var fullName;
            UserService
                .userIdtoUser(userId)
                .then(function (response) {
                    if (response.data) {
                        var u = response.data;
                        fullName = u.firstName + " " + u.lastName;
                        console.log("User full name: " + fullName);
                    }
                });
            return fullName;
        }

        function findAllReviewsByPlaceId(placeId) {
            ReviewService
                .findAllReviewsByPlaceId(placeId)
                .then(function (response) {
                    model.reviews = response.data;
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
            review.userId = $rootScope.user._id;
            console.log("addReview: " + JSON.stringify(review));
            ReviewService
                .addReview(review, $routeParams.id)
                .then(function (response) {
                    model.reviews = response.data;
                    console.log(model.reviews);
                });
        }

        function updateReview(review) {
            ReviewService
                .updateReview(review)
                .then(function (response) {
                    model.reviews = response.data;
                    model.review = {};
                    model.selected = -1;
                });
        }

        function deleteReview(index) {
            var reviewId = model.reviews[index]._id;
            ReviewService
                .deleteReview(reviewId)
                .then(function (response) {
                    if (response.data) {
                        model.reviews = response.data;
                        model.review = {};
                        model.selected = -1;
                    }
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