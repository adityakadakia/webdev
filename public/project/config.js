/**
 * Created by Aditya on 2/27/2016.
 */
/**
 * Created by Aditya on 2/20/2016.
 */
(function () {
    angular
        .module('Voyager')
        .config(configuration)

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

})();
