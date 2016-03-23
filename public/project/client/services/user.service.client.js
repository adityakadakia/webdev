/**
 * Created by Aditya on 2/27/2016.
 */
"use strict";
(function () {
    angular
        .module("Voyager")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {
        var api = {
            findUserByUsername: findUserByUsername,
            register: register,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            getProfile: getProfile,
            updateUser: updateUser,
            logOut: logOut,
            logIn: logIn
        };
        return api;

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }

        function logIn(username, password) {
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
        }

        function logOut() {
            return $http.post("/api/assignment/user/logout");
        }

        function updateUser(userId, user) {
            console.log("UserService updateUser");
            console.log(userId);
            return $http.put("/api/assignment/user/" + userId, user);
        }

        function register(user) {
            return $http.post("/api/assignment/user", user);
        }

        function getCurrentUser() {
            return $http.get("/api/assignment/user/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.user = user;
        }

        function getProfile() {
            return $http.get("/api/assignment/user/" + $rootScope.user._id);
        }
    }
})();
