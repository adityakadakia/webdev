(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($scope,$rootScope, $location, UserService){
        var model = this;
        model.login = login;

        function login(user) {
            console.log("LoginController login");
            UserService.logIn(user.username, user.password)
                .then(function (response) {
                    var u = response.data;
                    if (u != null) {
                        $rootScope.user = u;
                        $location.url("/profile");
                    }
                });
        }
    }
})();