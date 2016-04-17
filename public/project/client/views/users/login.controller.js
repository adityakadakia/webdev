/**
 * Created by Aditya on 3/10/2016.
 */
"use strict";
(function () {
    angular
        .module("Voyager")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {
        var model = this;
        console.log("LoginController");
        model.login = login;
        model.authenticateFail = false;
        model.authenticateFailReset = authenticateFailReset;

        function login(user) {
            console.log("LoginController login");
            UserService.logIn(user.username, user.password)
                .then(function (response) {
                    var u = response.data;
                    console.log("login response: " + JSON.stringify(u));
                    if (u != null) {
                        UserService.setCurrentUser(u);
                        $location.url("/profile");
                    }
                    else model.authenticateFail = true;
                });
        }

        function authenticateFailReset() {
            model.authenticateFail = false;
            console.log("reset: " + model.authenticateFail);
        }
    }
})();