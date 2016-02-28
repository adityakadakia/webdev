/**
 * Created by Aditya on 2/27/2016.
 */
(function () {
    angular
        .module("Voyager")
        .controller("DetailsController", DetailsController);

    function DetailsController($routeParams, $scope, $rootScope, SearchService) {
        var id = $routeParams.id;
        var results = $rootScope.results;
        for (i in results) {
            if (results[i].venue.id == id)
                $scope.item = results[i];
        }

    }
})();