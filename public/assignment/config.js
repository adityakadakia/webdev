/**
 * Created by Aditya on 2/20/2016.
 */
"use strict";
(function () {
    angular
        .module('FormBuilderApp')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "client/views/home/home.view.html",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/register", {
                templateUrl: "client/views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "client/views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "client/views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/forms", {
                templateUrl: "client/views/forms/forms.view.html",
                controller: "FormController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/forms/:formId/fields", {
                templateUrl: "client/views/forms/fields.view.html",
                controller: "FieldController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/admin", {
                templateUrl: "client/views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkAdmin
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    var checkAdmin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/assignment/user/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user != '' && user.roles.indexOf('admin') != -1) {
                $rootScope.user = user;
                deferred.resolve();
            }
        });
        return deferred.promise;
    };

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

})();
