/**
 * Created by Aditya on 2/27/2016.
 */
(function () {
    angular
        .module("Voyager")
        .controller("HomeController", HomeController);

    function HomeController($scope, SearchService, $rootScope) {
        $scope.searchTerm;
        $scope.explorePlaces = explorePlaces;
        $scope.imageSize = "/800X500/";

        function explorePlaces(searchTerm) {
            SearchService.explorePlace(searchTerm, function (places) {
                $rootScope.results = places.response.groups[0].items;
            })
        }
    }
})();