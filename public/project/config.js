/**
 * Created by Aditya on 2/27/2016.
 */
"use strict";
(function () {
    angular
        .module('Voyager')
        .config(configuration)

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "client/views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn,
                    checkProfile: checkProfile
                }
            })
            .when("/home/:placeQuery", {
                templateUrl: "client/views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn,
                    checkProfile: checkProfile
                }
            })
            .when("/login", {
                templateUrl: "client/views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model",
                resolve: {
                    checkProfile: checkProfile
                }
            })
            .when("/register", {
                templateUrl: "client/views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model",
                resolve: {
                    checkProfile: checkProfile
                }
            })
            .when("/profile", {
                templateUrl: "client/views/users/profile/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn,
                    checkProfile: checkProfile
                }
            })
            .when("/profile/:userId", {
                templateUrl: "client/views/users/profile/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn,
                    checkProfile: checkProfile
                }
            })
            .when("/followers", {
                templateUrl: "client/views/users/profile/followers.profile.view.html",
                controller: "FollowerController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn,
                    checkProfile: checkProfile
                }
            })
            .when("/followers/:userId", {
                templateUrl: "client/views/users/profile/followers.profile.view.html",
                controller: "FollowerController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn,
                    checkProfile: checkProfile
                }
            })
            .when("/following", {
                templateUrl: "client/views/users/profile/following.profile.view.html",
                controller: "FollowingController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn,
                    checkProfile: checkProfile
                }
            })
            .when("/following/:userId", {
                templateUrl: "client/views/users/profile/following.profile.view.html",
                controller: "FollowingController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn,
                    checkProfile: checkProfile
                }
            })
            .when("/likes", {
                templateUrl: "client/views/users/profile/likes.profile.view.html",
                controller: "LikesController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn,
                    checkProfile: checkProfile
                }
            })
            .when("/likes/:userId", {
                templateUrl: "client/views/users/profile/likes.profile.view.html",
                controller: "LikesController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn,
                    checkProfile: checkProfile
                }
            })
            .when("/details/:id", {
                templateUrl: "client/views/details/details.view.html",
                controller: "DetailsController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn,
                    checkProfile: checkProfile
                }
            })
            .when("/admin", {
                templateUrl: "client/views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn,
                    checkProfile: checkProfile
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function (response) {
                var currentUser = response.data;
                UserService.setCurrentUser(currentUser);
                deferred.resolve();
            });

        return deferred.promise;
    }

    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function (response) {
                var currentUser = response.data;
                if (currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });

        return deferred.promise;
    }

    function checkProfile($location, $rootScope) {
        var url = $location.url();
        if (url.indexOf("profile") > -1 || url.indexOf("like") > -1 || url.indexOf("follow") > -1) {
            $rootScope.isProfilePage = true;
        } else {
            $rootScope.isProfilePage = false;
        }
    }

})();
