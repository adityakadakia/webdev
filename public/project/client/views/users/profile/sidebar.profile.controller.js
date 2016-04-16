/**
 * Created by Aditya on 4/15/2016.
 */
"use strict";
(function () {
    angular
        .module("Voyager")
        .controller("SidebarController", SidebarController);

    function SidebarController($location, $routeParams, UserService) {
        var model = this;
        model.userId = $routeParams.userId;
        console.log("userId: " + model.userId);
        model.previlege = false;
        model.toggleFollow = toggleFollow;

        init();

        function init() {
            console.log("Sidebar init");
            if (model.userId) {
                UserService
                    .userIdtoUser(model.userId)
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
                        model.userId = response.data._id;
                        model.userprofile = response.data;
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
    }
})();