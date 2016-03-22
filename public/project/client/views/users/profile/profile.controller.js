/**
 * Created by Aditya on 3/11/2016.
 */
"use strict";
(function () {
    angular
        .module("Voyager")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, UserService) {
        console.log("ProfileController");

        $scope.update = update;
        $scope.userprofile = {
            "_id": $rootScope.user._id,
            "firstName": $rootScope.user.firstName,
            "lastName": $rootScope.user.lastName,
            "username": $rootScope.user.username,
            "password": $rootScope.user.password,
            "roles": $rootScope.user.roles
        }
        console.log($scope.userprofile);

        function update(userprofile) {
            UserService.updateUser(userprofile._id, userprofile, function (users) {
                if (users != null)
                    $rootScope.user = {
                        "_id": $rootScope.user._id,
                        "firstName": userprofile.firstName,
                        "lastName": userprofile.lastName,
                        "username": userprofile.username,
                        "password": userprofile.password,
                        "roles": userprofile.roles
                    }
            });
        }
    }
})();