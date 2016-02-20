/**
 * Created by Aditya on 2/20/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController", mainController);

    function mainController($scope, $location){
        $scope.$location = $location;
    }
})();