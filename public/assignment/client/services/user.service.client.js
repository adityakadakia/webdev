/**
 * Created by Aditya on 2/21/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {
        var api = {
            register: register
        };
        return api;

        function register(user) {
            return $http.post("/api/assignment/user", user);
        }
    }
})();
