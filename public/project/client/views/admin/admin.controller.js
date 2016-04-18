/**
 * Created by Aditya on 4/17/2016.
 */
"use strict";
(function () {
    angular
        .module("Voyager")
        .controller("AdminController", AdminController);

    function AdminController($scope, UserService) {
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
        model.predicate = 'username';
        model.reverse = true;
        model.order = function (predicate) {
            model.reverse = (model.predicate === predicate) ? !model.reverse : false;
            model.predicate = predicate;
        };

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
            console.log("add: " + JSON.stringify(user));
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