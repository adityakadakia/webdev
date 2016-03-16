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
            UserService.updateUser(user._id, user, function (u) {
                $rootScope.user = u;
            })
        }
    }
})();
