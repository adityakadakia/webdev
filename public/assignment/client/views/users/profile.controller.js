"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService) {
        var model = this;
        model.update = update;
        init();

        function init() {
            console.log("ProfileController init");
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        console.log("initial user: " + JSON.stringify(user));
                    }
                });
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
