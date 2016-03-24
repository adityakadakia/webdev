var reviews = require("./review.mock.json");

module.exports = function (uuid) {

    var api = {
        findReviewByPlaceId: findReviewByPlaceId,
        findAllReviews: findAllReviews,
        addReview: addReview,
        deleteReview: deleteReview,
        updateReview: updateReview
    };

    return api;

    function findReviewByPlaceId(placeId) {
        var r = [];
        for (var i in reviews) {
            if (reviews[i].placeId == placeId) {
                r.push(reviews[i]);
            }
        }
        return r;
    }

    function findAllReviews() {
        return reviews;
    }

    function addReview(review, userId, placeId) {
        var r = review;
        r._id = uuid.v4();
        r.userId = userId;
        r.placeId = placeId;
        r.timestamp = new Date();
        reviews.push(review);
        return reviews;
    }

    function deleteReview(reviewId) {
        for (i in reviews) {
            if (reviews[i]._id == reviewId) {
                reviews.splice(i, 1);
                return (reviews);
            }
        }
        return reviews;
    }

    function updateReview(reviewId, review) {
        console.log("reviewModel updateReview");
        for (var i in reviews) {
            if (reviews[i]._id == reviewId) {
                reviews[i].description = review.description
                return reviews;
            }
        }
        return null;
    }
}