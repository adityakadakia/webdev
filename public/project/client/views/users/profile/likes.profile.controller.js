/**
 * Created by Aditya on 4/11/2016.
 */
"use strict";
(function () {
    angular
        .module("Voyager")
        .controller("LikesController", LikesController);

    function LikesController($routeParams, $location, UserService, VenueService) {
        var model = this;
        var userId = $routeParams.userId;
        model.venues = [];
        console.log("userId: " + userId);

        if (userId) {
            UserService
                .userIdtoUser(userId)
                .then(function (response) {
                    initUserProfile(response.data);
                });
        } else {
            UserService.getCurrentUser()
                .then(function (response) {
                    //return UserService.userIdtoUser(response.data._id);
                    $location.url('/likes/' + response.data._id);

                });
            //.then(function (response) {
            //    initUserProfile(response.data);
            //});
        }

        function initUserProfile(u) {
            model.userProfile = u;
            for (var i in model.userProfile.likes) {
                VenueService
                    .findVenueByFoursquareId(model.userProfile.likes[i])
                    .then(function (response) {
                        model.venues.push(response.data);
                    });
            }
            console.log("user: " + JSON.stringify(model.userProfile));
        }

    }
})();