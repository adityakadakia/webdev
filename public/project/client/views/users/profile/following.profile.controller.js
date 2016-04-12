/**
 * Created by Aditya on 4/11/2016.
 */
"use strict";
(function () {
    angular
        .module("Voyager")
        .controller("FollowingController", FollowingController);

    function FollowingController($routeParams, $location, UserService) {
        var model = this;
        var userId = $routeParams.userId;
        model.following = [];
        console.log("userId: " + userId);

        if (userId) {
            UserService
                .userIdtoUser(userId)
                .then(function (response) {
                    initUserProfile(response.data);
                });
        } else {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    $location.url('/following/' + response.data._id);
                });
        }

        function initUserProfile(u) {
            model.userProfile = u;
            for (var i in model.userProfile.following) {
                UserService
                    .userIdtoUser(model.userProfile.following[i])
                    .then(function (response) {
                        model.following.push(response.data);
                    });
            }
            console.log("user: " + JSON.stringify(model.userProfile));
        }
    }
})();