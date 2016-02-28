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
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html"
            })
            .when("/profile", {
                templateUrl: "views/users/profile/profile.view.html"
            })
            .when("/followers", {
                templateUrl: "views/users/profile/followers.profile.view.html"
            })
            .when("/following", {
                templateUrl: "views/users/profile/following.profile.view.html"
            })
            .when("/likes", {
                templateUrl: "views/users/profile/likes.profile.view.html"
            })
            .when("/details/:id", {
                templateUrl: "views/details/details.view.html",
                controller: "DetailsController"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

})();
