/**
 * Created by Aditya on 2/21/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
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
            logIn: logIn,
            createUser: createUser,
            findAllUsers: findAllUsers,
            deleteUser: deleteUser
        };
        return api;

        function deleteUser(userId) {
            return $http.delete('/api/assignment/admin/user/' + userId);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/admin/user");
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }

        function logIn(user) {
            return $http.post("/api/assignment/login", user);
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

        function createUser(user) {
            return $http.post('/api/assignment/admin/user', user);
        }
    }
})();
