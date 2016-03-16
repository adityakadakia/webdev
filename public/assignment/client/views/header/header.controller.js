(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location) {
        $scope.logOut = logOut;

        function logOut() {
            console.log("logout: ");
            console.log($rootScope.user);
            delete $rootScope.user;
        }
    }
})();