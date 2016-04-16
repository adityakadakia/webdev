"use strict";
(function () {
    angular
        .module("Voyager")
        .controller("MainController", MainController);

    function MainController($scope, $location, $rootScope) {
        $scope.$location = $location;

        var model = this;
        $rootScope.isToggleMenuVisible = true;
    }
})();