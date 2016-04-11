/**
 * Created by Aditya on 3/11/2016.
 */
"use strict";
(function () {
    angular
        .module("Voyager")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, $location, UserService) {
        var model = this;
        model.update = update;
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
                        var u = response.data;
                        if (u._id == model.userprofile._id)
                            model.previlege = true;
                    });
            } else {
                console.log("User unspecified: fetching current user information.");
                UserService.getCurrentUser()
                    .then(function (response) {
                        $location.url('/profile/' + response.data._id);
                    });
            }
        }

        function update(user) {
            console.log("ProfileController update");
            console.log("submitted user: " + JSON.stringify(user));
            UserService.updateUser(user._id, user)
                .then(function (u) {
                    console.log("updated user: " + JSON.stringify(u.data));
                    UserService.setCurrentUser(u.data);
                });
        }
    }
})();