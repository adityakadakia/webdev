(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location,$rootScope, UserService) {

        $scope.register = register;

        function register(user) {
            console.log(user);
            UserService.findUserByUsername(user, doRegister);
        }

        function doRegister(user) {
            if (user != null) {
                console.log(user);
                UserService.createUser(user, redirectUserToProfileIfValid);
            } else {
                alert("User Already Exists");
            }
        }

        function redirectUserToProfileIfValid(user) {
            if (user != null) {
                $rootScope.user = user;
                $location.url("/profile")
            }
        }
    }
})();