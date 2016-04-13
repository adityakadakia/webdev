"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($scope,$rootScope, $location, UserService){
        var model = this;
        model.login = login;

        function login(user) {
            console.log("LoginController login");

            if (user)
                UserService
                    .logIn(user)
                    .then(function (response) {
                            var u = response.data;
                            console.log("login response: " + JSON.stringify(u));
                            if (u != null) {
                                UserService.setCurrentUser(u);
                                $location.url("/profile");
                            }
                        },
                        function (err) {
                            $scope.error = err;
                        }
                    );
            //UserService.logIn(user.username, user.password)
            //    .then(function (response) {
            //        var u = response.data;
            //        console.log("login response: " + JSON.stringify(u));
            //        if (u != null) {
            //            UserService.setCurrentUser(u);
            //            $location.url("/profile");
            //        }
            //    });
        }
    }
})();