/**
 * Created by Aditya on 3/23/2016.
 */
"use strict";
(function () {
    angular
        .module("Voyager")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location, UserService) {
        var model = this;
        model.logOut = logOut;
        model.toggleMenu = toggleMenu;

        UserService
            .getCurrentUser()
            .then(function (response) {
                model.user = response.data;
            })

        function toggleMenu() {
            $("#wrapper").toggleClass("toggled");
        }

        function logOut() {
            console.log("HeaderController logOut");
            UserService
                .logOut()
                .then(function (response) {
                    console.log(response.data);
                    $rootScope.user = undefined;
                    $location.url("/home");
                });
        }
    }
})();