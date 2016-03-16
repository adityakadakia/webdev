/**
 * Created by Aditya on 2/20/2016.
 */
(function () {
    angular
        .module('FormBuilderApp')
        .config(configuration)
        .run(redirect);

    function redirect($rootScope, $location) {

        // register listener to watch route changes
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            if ($rootScope.user == null) {
                // no logged user, we should be going to #login
                var url1 = next.templateUrl == "client/views/home/home.view.html";
                var url2 = next.templateUrl == "client/views/users/register.view.html";
                var url3 = next.templateUrl == "client/views/users/login.view.html";
                if (url1 || url2 || url3) {
                    // already going to #login, no redirect needed
                } else {
                    // not going to #login, we should redirect now
                    $location.path("/home");
                }
            }
        });
    }

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "client/views/home/home.view.html"
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
                controllerAs: "model"
            })
            .when("/forms", {
                templateUrl: "client/views/forms/forms.view.html",
                controller: "FormController",
                controllerAs: "model"
            })
            .when("/fields", {
                templateUrl: "client/views/forms/fields.view.html"
            })
            .when("/admin", {
                templateUrl: "client/views/admin/admin.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

})();
