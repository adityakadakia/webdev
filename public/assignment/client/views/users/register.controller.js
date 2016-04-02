"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService) {
        var model = this;

        model.register = register;
        model.duplicateUser = false;

        function register(user) {
            var users;
            console.log("RegisterController register");
            console.log("Submitted user: " + JSON.stringify(user));
            UserService.register(user)
                .then(function (response) {
                        users = response.data;
                        if (users) {
                            UserService
                                .findUserByUsername(user.username)
                                .then(function (res) {
                                    var usr = res.data;
                                    console.log("Registered user: " + JSON.stringify(usr));
                                    if (usr) {
                                        UserService.setCurrentUser(usr);
                                        $location.url("/profile");
                                    }
                                });
                        }
                    },
                    function (err) {
                        console.log(err.data);
                        if (err.data == "Duplicate User")
                            model.duplicateUser = true;
                    });
        }
    }
})();