/**
 * Created by Aditya on 3/11/2016.
 */
"use strict";
(function () {
    angular
        .module("Voyager")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService) {
        var model = this;
        model.register = register;

        function register(user) {
            console.log(user);
            UserService.findUserByUsername(user, doRegister);
        }

        function doRegister(user) {
            if (user != null) {
                console.log(user);
                UserService.createUser(user, redirectUserToProfileIfValid);
            } else {
                alert("User Already Exists");
            }
        }

        function redirectUserToProfileIfValid(user) {
            if (user != null) {
                $rootScope.user = user;
                $location.url("/profile")
            }
        }
    }
})();