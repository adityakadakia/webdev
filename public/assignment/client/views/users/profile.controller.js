"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService) {
        var model = this;

        model.user = $rootScope.user;
        model.update = update;

        function update(user) {
            console.log("ProfileController update");
            console.log(model.user._id);
            UserService.updateUser(model.user._id, model.user)
                .then(function (u) {
                    console.log("ProfileController then");
                    console.log(u.data);
                    UserService.setCurrentUser(u);
                    $rootScope.user = model.user;
                    console.log(model.user);
                });
        }
    }
})();
