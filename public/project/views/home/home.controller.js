/**
 * Created by Aditya on 2/27/2016.
 */
(function () {
    angular
        .module("Voyager")
        .controller("HomeController", HomeController);

    function HomeController($scope, SearchService) {
        $scope.searchTerm;
        $scope.results;
        $scope.explorePlaces = explorePlaces;

        function explorePlaces(searchTerm) {
            SearchService.explorePlace(searchTerm, function (places) {
                $scope.results = places;
            })
        }
    }
})();