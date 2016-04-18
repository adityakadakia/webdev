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
            logIn: logIn,
            userIdtoUser: userIdtoUser,
            likePlace: likePlace,
            unlikePlace: unlikePlace,
            followUser: followUser,
            unfollowUser: unfollowUser,
            createUser: createUser,
            updateUserAdmin: updateUserAdmin,
            deleteUser: deleteUser,
            findAllUsers: findAllUsers
        };
        return api;

        function createUser(user) {
            return $http.post('/api/project/admin/user', user);
        }

        function updateUserAdmin(userId, user) {
            return $http.put('/api/project/admin/user/' + userId, user);
        }

        function deleteUser(userId) {
            return $http.delete('/api/project/admin/user/' + userId);
        }

        function findAllUsers() {
            return $http.get("/api/project/admin/user");
        }

        function followUser(followId) {
            return $http.post("/api/project/user/follow/" + followId);
        }

        function unfollowUser(followId) {
            return $http.delete("/api/project/user/follow/" + followId);
        }

        function likePlace(placeId) {
            return $http.post("/api/project/user/like/" + placeId);
        }

        function unlikePlace(placeId) {
            return $http.delete("/api/project/user/like/" + placeId);
        }

        function findUserByUsername(username) {
            return $http.get("/api/project/user?username=" + username);
        }

        function logIn(username, password) {
            return $http.post("/api/project/login", {username: username, password: password});
        }

        function logOut() {
            return $http.post("/api/project/user/logout");
        }

        function updateUser(userId, user) {
            console.log("UserService updateUser");
            console.log(userId);
            return $http.put("/api/project/user/" + userId, user);
        }

        function register(user) {
            return $http.post("/api/project/user", user);
        }

        function getCurrentUser() {
            return $http.get("/api/project/user/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.user = user;
        }

        function getProfile() {
            return $http.get("/api/project/user/" + $rootScope.user._id);
        }

        function userIdtoUser(userId) {
            return $http.get("/api/project/user/" + userId);
        }

        function login(user) {
            return $http.post("/api/project/login", user);
        }
    }
})();
