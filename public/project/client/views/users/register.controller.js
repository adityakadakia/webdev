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
        model.duplicateUser = false;

        function validateUser(user) {
            var flag = true;
            flag = flag && user.username;
            flag = flag && user.password;
            flag = flag && user.firstName;
            flag = flag && user.lastName;
            flag = flag && user.emails;
            if (user.password == user.verifyPassword)
                flag = flag && true;
            else
                flag = flag && false;
            return flag;
        }

        function register(user) {
            var users;
            console.log("RegisterController register");
            console.log("Submitted user: " + JSON.stringify(user));
            var flag = validateUser(user);
            if (flag == true)
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
                                        },
                                        function (err) {
                                            console.log(err.data);
                                        });
                            }
                        },
                        function (err) {
                            console.log(err.data);
                            if (err.data == "Duplicate User")
                                model.duplicateUser = true;
                        });
            else {
                alert("Please verify your details.");
            }
        }
    }
})();