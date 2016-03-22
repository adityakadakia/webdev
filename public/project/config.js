/**
 * Created by Aditya on 2/27/2016.
 */
(function () {
    angular
        .module('Voyager')
        .config(configuration)

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "client/views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/login", {
                templateUrl: "client/views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/register", {
                templateUrl: "client/views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/profile", {
                templateUrl: "client/views/users/profile/profile.view.html",
                controller: "ProfileController"
            })
            .when("/followers", {
                templateUrl: "client/views/users/profile/followers.profile.view.html"
            })
            .when("/following", {
                templateUrl: "client/views/users/profile/following.profile.view.html"
            })
            .when("/likes", {
                templateUrl: "client/views/users/profile/likes.profile.view.html"
            })
            .when("/details/:id", {
                templateUrl: "client/views/details/details.view.html",
                controller: "DetailsController"
            })
            .when("/admin", {
                templateUrl: "client/views/admin/admin.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

})();
