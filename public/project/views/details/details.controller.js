/**
 * Created by Aditya on 2/27/2016.
 */
(function () {
    angular
        .module("Voyager")
        .controller("DetailsController", DetailsController);

    function DetailsController($routeParams, $scope, $rootScope, SearchService, ReviewService, UserService) {
        var id = $routeParams.id;
        var results = $rootScope.results;
        $scope.selected = -1;
        $scope.deleteReview = deleteReview;
        $scope.addReview = addReview;
        $scope.selectReview = selectReview;
        $scope.updateReview = updateReview;
        $scope.findFullUserNamebyUserId = findFullUserNamebyUserId;

        for (i in results) {
            if (results[i].venue.id == id)
                $scope.item = results[i];
        }

        initMap();
        console.log("placeId: " + $scope.item.venue.id);
        findAllReviewsByPlaceId($scope.item.venue.id);
        console.log($scope.reviews);

        function findFullUserNamebyUserId(userId) {
            return UserService.userIdtoFullUserName(userId);
        }

        function findAllReviewsByPlaceId(placeId) {
            ReviewService.findAllReviewsByPlaceId(placeId, function (response) {
                $scope.reviews = response;
            });
        }

        function selectReview(index) {
            $scope.selected = index;
            var editReview = {
                "_id": $scope.reviews[index]["_id"],
                "title": $scope.reviews[index]["title"],
                "description": $scope.reviews[index]["description"],
                "timestamp": $scope.reviews[index]["timestamp"],
                "placeId": $scope.reviews[index]["placeId"],
                "userId": $scope.reviews[index]["userId"],
                "commentIds": $scope.reviews[index]["commentIds"]
            }
            $scope.review = editReview;
            $scope.editReview = editReview;
        }

        function addReview(review) {
            ReviewService.addReview(review, $scope.item.venue.id, function () {
                $scope.review = {};
                $scope.selected = -1;
                findAllReviewsByPlaceId($scope.item.venue.id);
            });
        }

        function updateReview(review) {
            ReviewService.updateReview(review, function (newReview) {
                $scope.reviews[$scope.selected] = newReview;
                $scope.review = {};
                $scope.selected = -1;
            });
        }

        function deleteReview(index) {
            var reviewId = $scope.reviews[index]._id;
            ReviewService.deleteReview(reviewId, function () {
                $scope.review = {};
                $scope.selected = -1;
                findAllReviewsByPlaceId($scope.item.venue.id);
            });
        }

        function initMap() {
            var bounds = new google.maps.LatLngBounds();
            console.log("details: initMap");
            var myLatLng = {lat: $scope.item.venue.location.lat, lng: $scope.item.venue.location.lng};

            var map = new google.maps.Map(document.getElementById('details-map'), {
                zoom: 13,
                center: myLatLng
            });

            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
            });

            bounds.extend(marker.getPosition());
            //map.fitBounds(bounds);
        }
    }
})();