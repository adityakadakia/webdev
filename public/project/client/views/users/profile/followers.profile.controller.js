/**
 * Created by Aditya on 4/11/2016.
 */
"use strict";
(function () {
    angular
        .module("Voyager")
        .controller("FollowerController", FollowerController);

    function FollowerController($routeParams, $location, UserService) {
        var model = this;
        var userId = $routeParams.userId;
        model.followers = [];
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
                    $location.url('/followers/' + response.data._id);
                });
        }

        function initUserProfile(u) {
            model.userProfile = u;
            for (var i in model.userProfile.followers) {
                UserService
                    .userIdtoUser(model.userProfile.followers[i])
                    .then(function (response) {
                        model.followers.push(response.data);
                    });
            }
            console.log("user: " + JSON.stringify(model.userProfile));
        }
    }
})();