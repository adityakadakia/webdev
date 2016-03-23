/**
 * Created by Aditya on 3/11/2016.
 */
"use strict";
(function () {
    angular
        .module("Voyager")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, UserService) {
        var model = this;

        model.update = update;
        model.userprofile = $rootScope.user;

        console.log("ProfileController" + JSON.stringify(model.userprofile));

        function update(userprofile) {
            UserService.updateUser(userprofile._id, userprofile, function (users) {
                if (users != null)
                    $rootScope.user = model.userprofile
            });
        }
    }
})();