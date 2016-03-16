(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($scope,$rootScope, $location, UserService){
        var model = this;
        model.login = login;

        function login(user){
            console.log("LoginController login");
            UserService.findUserByCredentials(user.username, user.password,function(u){
                if(u != null){
                    $rootScope.user = u;
                    $location.url("/profile");
                }
            })
        }
    }
})();