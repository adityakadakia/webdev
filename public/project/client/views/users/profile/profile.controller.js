/**
 * Created by Aditya on 3/11/2016.
 */
"use strict";
(function () {
    angular
        .module("Voyager")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, $location, $rootScope, UserService) {
        var model = this;
        model.update = update;
        model.toggleFollow = toggleFollow;
        var userId = $routeParams.userId;
        model.previlege = false;
        init();

        function init() {
            console.log("ProfileController init");
            if (userId) {
                UserService
                    .userIdtoUser(userId)
                    .then(function (response) {
                        model.userprofile = response.data;
                        return UserService.getCurrentUser();
                    })
                    .then(function (response) {
                        model.currUser = response.data;
                        if (model.currUser._id == model.userprofile._id)
                            model.previlege = true;
                        if (model.currUser.following.indexOf(model.userprofile._id) > -1)
                            model.isFollows = true;
                        else
                            model.isFollows = false;
                    });
            } else {
                console.log("User unspecified: fetching current user information.");
                UserService.getCurrentUser()
                    .then(function (response) {
                        $location.url('/profile/' + response.data._id);
                    });
            }
        }

        function toggleFollow() {
            console.log("toggleFollow");
            if (model.previlege == false) {
                if (model.isFollows == false) {
                    console.log("Follow: " + model.userprofile.firstName);
                    UserService
                        .followUser(model.userprofile._id)
                        .then(function (response) {
                            if (response.status == 200)
                                model.isFollows = true;
                        });
                } else {
                    UserService.unfollowUser(model.userprofile._id)
                        .then(function (response) {
                            if (response.status == 200)
                                model.isFollows = false;
                        });
                }
            }
        }

        function update(user) {
            console.log("ProfileController update");
            console.log("submitted user: " + JSON.stringify(user));
            UserService.updateUser(user._id, user)
                .then(function (u) {
                    console.log("updated user: " + JSON.stringify(u.data));
                    UserService.setCurrentUser(u.data);
                    $rootScope.initProfileSidebar();
                });
        }
    }
})();