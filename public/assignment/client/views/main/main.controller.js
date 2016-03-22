/**
 * Created by Aditya on 2/20/2016.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($scope, $location){
        $scope.$location = $location;
    }
})();