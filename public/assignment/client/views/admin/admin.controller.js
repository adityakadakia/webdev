"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService) {
        var model = this;

        model.remove = remove;
        model.update = update;
        model.add = add;
        model.select = select;

        function init() {
            UserService
                .findAllUsers()
                .then(handleSuccess, handleError);
        }

        init();

        function remove(user) {
            UserService
                .deleteUser(user._id)
                .then(handleSuccess, handleError);
        }

        function update(user) {
            UserService
                .updateUserAdmin(user._id, user)
                .then(handleSuccess, handleError);
        }

        function add(user) {
            UserService
                .createUser(user)
                .then(handleSuccess, handleError);
        }

        function select(user) {
            model.inputUser = angular.copy(user);
        }

        function handleSuccess(response) {
            model.users = response.data;
            model.inputUser = {};
        }

        function handleError(error) {
            model.error = error;
        }
    }
})();