(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location,$rootScope, UserService) {
        var model = this;

        model.register = register;

        function register(user) {
            console.log("RegisterController register");
            console.log(user);
            UserService.findUserByUsername(user, doRegister);
        }

        function doRegister(user) {
            console.log("RegisterController doRegister");
            if (user != null) {
                console.log(user);
                UserService.createUser(user, redirectUserToProfileIfValid);
            } else {
                alert("User Already Exists");
            }
        }

        function redirectUserToProfileIfValid(user) {
            console.log("RegisterController redirectUserToProfileIfValid");
            if (user != null) {
                $rootScope.user = user;
                $location.url("/profile")
            }
        }
    }
})();