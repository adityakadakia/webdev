(function () {

    angular
        .module("Voyager")
        .factory("ReviewService", ReviewService);

    function ReviewService($rootScope) {
        var reviews = [
            {
                "_id": 1,
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "timestamp": "Mar 5, 2016",
                "placeId": "44cf0ff8f964a5201c361fe3",
                "userId": 123,
                "commentIds": [1, 2, 3]
            },
            {
                "_id": 2,
                "description": "Donec id elit non orci eleifend consectetur vel et elit",
                "timestamp": "Mar 7, 2016",
                "placeId": "44cf0ff8f964a5201c361fe3",
                "userId": 234,
                "commentIds": [4, 5]
            },
            {
                "_id": 3,
                "description": "Maecenas mattis venenatis ex eget pretium.",
                "timestamp": "Mar 8, 2016",
                "placeId": "44cf0ff8f964a5201c361fe3",
                "userId": 123,
                "commentIds": []
            }
        ];

        var api = {
            findAllReviewsByPlaceId: findAllReviewsByPlaceId,
            addReview: addReview,
            updateReview: updateReview,
            deleteReview: deleteReview
        };
        return api;

        function findAllReviewsByPlaceId(placeId, callback) {
            var result = [];
            for (var i = 0; i < reviews.length; i++) {
                if (reviews[i].placeId === placeId) {
                    result.push(reviews[i]);
                }
            }
            callback(result.length === 0 ? null : result);
        }

        function addReview(review, placeId, callback) {
            var id = (new Date).getTime();
            var newReview = {
                "_id": id,
                "title": review.title,
                "description": review.description,
                "timestamp": new Date(),
                "placeId": placeId,
                "userId": $rootScope.user._id,
                "commentIds": []
            };
            reviews.push(newReview);
            callback();
        }

        function updateReview(review, callback) {
            var reviewIndex = findReviewIndexByReviewId(review._id);
            reviews[reviewIndex] = {
                "_id": review._id,
                "title": review.title,
                "description": review.description,
                "timestamp": new Date(),
                "placeId": review.placeId,
                "userId": review.userId,
                "commentIds": review.commentIds
            };
            callback(reviews[reviewIndex]);
        }

        function deleteReview(reviewId, callback) {
            var reviewIndex = findReviewIndexByReviewId(reviewId);
            reviews.splice(reviewIndex, 1);
            callback();
        }

        function findReviewIndexByReviewId(reviewId) {
            var index = 0;
            for (var i = 0; i < reviews.length; i++) {
                if (reviews[i]._id === reviewId) {
                    return index;
                }
                index++;
            }
        }
    }

})();