/**
 * Created by Aditya on 2/27/2016.
 */
"use strict";
(function () {
    angular
        .module("Voyager")
        .controller("DetailsController", DetailsController);

    function DetailsController($routeParams, $rootScope, SearchService, ReviewService, UserService, VenueService, WikipediaService) {
        var model = this;
        var id = $routeParams.id;
        model.selected = -1;
        model.deleteReview = deleteReview;
        model.addReview = addReview;
        model.selectReview = selectReview;
        model.updateReview = updateReview;
        model.findFullUserNamebyUserId = findFullUserNamebyUserId;
        model.toggleLike = toggleLike;
        model.isLiked = false;
        model.reviewUsers = [];

        checkLiked();
        findAllReviewsByPlaceId(id);
        $('[data-toggle="tooltip"]').tooltip();

        SearchService
            .findPlaceDetailsByPlaceId(id)
            .then(function (res) {
                var venueObject = res.data;
                model.item = venueObject.response;
                console.log("placeId: " + model.item.venue.id);
                initMap();
                findPlaceDescription();
            }, function (err) {
                console.log(err);
            });

        function findPlaceDescription() {
            WikipediaService
                .findPlaceDescription(model.item.venue.name)
                .then(function (response) {
                    model.wiki = response.data.extract;
                });
        }

        function checkLiked() {
            UserService
                .getCurrentUser()
                .then(function (u) {
                    var user = u.data;
                    if (user) {
                        console.log("checkLiked user: " + JSON.stringify(user));
                        if (user.likes.indexOf(id) > -1)
                            model.isLiked = true;
                    }
                });
        }

        function toggleLike() {
            if (model.isLiked == false) {
                UserService
                    .likePlace(id)
                    .then(function (res) {
                        console.log(res);
                        if (res.data)
                            model.isLiked = true;
                    }, function (err) {
                        console.log(err);
                    });
            } else {
                UserService
                    .unlikePlace(id)
                    .then(function (res) {
                        if (res.data)
                            model.isLiked = false;
                    }, function (err) {
                        console.log(err);
                    });
            }
            addVenue();
        }

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
                    console.log("reviews: " + JSON.stringify(model.reviews));
                    for (var i in model.reviews) {
                        console.log(i);
                        UserService
                            .userIdtoUser(model.reviews[i].userId)
                            .then((function (response) {
                                var u = response.data;
                                console.log("users: " + JSON.stringify(u));
                                model.reviewUsers.push(u);

                            }, function (err) {
                                var u = err.data;
                                console.log("err: " + JSON.stringify(err.data));
                                model.reviewUsers.push(u);
                                for (var i in model.reviews) {
                                    for (var j in model.reviewUsers) {
                                        if (model.reviews[i].userId == model.reviewUsers[j]._id) {
                                            model.reviews[i].fullName = model.reviewUsers[j].firstName + " " + model.reviewUsers[j].lastName;
                                            model.reviews[i].usrImg = model.reviewUsers[j].imgUrl;
                                        }
                                    }
                                }
                            }));
                    }
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
                    model.review = {};
                    model.selected = -1;
                    console.log(model.reviews);
                    findAllReviewsByPlaceId(id);
                });
            addVenue();
        }

        function updateReview(review) {
            ReviewService
                .updateReview(review)
                .then(function (response) {
                    model.reviews = response.data;
                    model.review = {};
                    model.selected = -1;
                    findAllReviewsByPlaceId(id);
                });
        }

        function deleteReview(index) {
            var reviewId = model.reviews[index]._id;
            ReviewService
                .deleteReview(reviewId)
                .then(function (response) {
                    return ReviewService.findAllReviewsByPlaceId(id);
                })
                .then(function (response) {
                    if (response.data) {
                        model.reviews = response.data;
                        model.review = {};
                        model.selected = -1;
                        findAllReviewsByPlaceId(id);
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

        function addVenue() {
            var v = {};
            v.foursquareId = model.item.venue.id;
            v.name = model.item.venue.name;
            v.category = model.item.venue.categories[0].name;
            v.prefix = model.item.venue.bestPhoto.prefix;
            v.suffix = model.item.venue.bestPhoto.suffix;
            VenueService.addVenue(v);
        }
    }
})();


//for (var i in results) {
//    if (results[i].venue.id == id)
//        model.item = results[i];
//}
