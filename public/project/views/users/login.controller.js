/**
 * Created by Aditya on 3/10/2016.
 */
(function () {
    angular
        .module("Voyager")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {
        $scope.login = login;

        function login(user) {
            UserService.findUserByCredentials(user.username, user.password, function (u) {
                if (u != null) {
                    $rootScope.user = u;
                    console.log($rootScope.user);
                    $location.url("/profile");
                }
            })
        }
    }
})();