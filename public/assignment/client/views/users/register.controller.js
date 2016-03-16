(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location,$rootScope, UserService) {
        var model = this;

        model.register = register;

        function register(user) {
            var users;
            console.log("RegisterController register");
            console.log(user);
            UserService.register(user)
                .then(function (response) {
                    users = response.data;
                    console.log(users);
                });
        }
    }
})();