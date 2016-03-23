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
                });
        }

        //function login(user) {
        //    UserService.findUserByCredentials(user.username, user.password, function (u) {
        //        if (u != null) {
        //            $rootScope.user = u;
        //            console.log("Authentication success.");
        //            console.log($rootScope.user);
        //            $location.url("/profile");
        //        }
        //    })
        //}
    }
})();