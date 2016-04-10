var reviews = require("./review.mock.json");
var q = require("q");

module.exports = function (db, mongoose, uuid) {
    var reviewSchema = require("./review.schema.server.js")(mongoose);
    var reviewModel = mongoose.model('Review', reviewSchema);

    var api = {
        findReviewByPlaceId: findReviewByPlaceId,
        findAllReviews: findAllReviews,
        addReview: addReview,
        deleteReview: deleteReview,
        updateReview: updateReview
    };

    return api;

    function findReviewByPlaceId(placeId) {
        console.log("reviewModel findReviewByPlaceId");
        return reviewModel.find({placeId: placeId});
    }

    function findAllReviews() {
        return reviews;
    }

    function addReview(review, userId, placeId) {
        var r = review;
        r.userId = userId;
        r.placeId = placeId;
        r.timestamp = new Date();
        console.log("reviewModel addReview: " + JSON.stringify(review));
        return reviewModel.create(r);
    }

    function deleteReview(reviewId) {
        console.log("reviewModel deleteReview");
        return reviewModel.remove({_id: reviewId});
    }

    function updateReview(reviewId, review) {
        console.log("reviewModel updateReview");
        delete review._id;
        review.timestamp = new Date();
        return reviewModel.update({_id: reviewId}, {$set: review});
    }
}