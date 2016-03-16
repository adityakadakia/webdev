(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location) {
        var model = this;
        model.logOut = logOut;

        function logOut() {
            console.log("logout: ");
            console.log($rootScope.user);
            delete $rootScope.user;
        }
    }
})();