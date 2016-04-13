"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location, UserService) {
        var model = this;
        model.logOut = logOut;

        function logOut() {
            console.log("HeaderController logOut");
            UserService
                .logOut()
                .then(function (response) {
                    console.log("logOut: " + response.status + " " + response.data);
                    if (response.status == 200) {
                        $rootScope.user = undefined;
                        $location.url("/home");
                    }
                });
        }
    }
})();