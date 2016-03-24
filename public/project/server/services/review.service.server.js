/**
 * Created by Aditya on 3/23/2016.
 */
module.exports = function (app, reviewModel) {

    app.get("/api/project/review", findAllReviews);
    app.get("/api/project/review/:placeId", findReviewByPlaceId);
    app.post("/api/project/review/:placeId", addReview);
    app.delete("/api/project/review/:id", deleteReview);
    app.put("/api/project/review/:id", updateReview);

    function findAllReviews(req, res) {
        var reviews = reviewModel.findAllReviews();
        res.json(reviews);
    }

    function findReviewByPlaceId(req, res) {
        var placeId = req.params.placeId;
        var reviews = reviewModel.findReviewByPlaceId(placeId);
        res.json(reviews);
    }

    function addReview(req, res) {
        var review = req.body;
        var userId = req.session.currentUser._id;
        var placeId = req.params.placeId;
        var reviews = reviewModel.addReview(review, userId, placeId);
        res.json(reviews);
    }

    function deleteReview(req, res) {
        var reviewId = req.params.id;
        var reviews = reviewModel.deleteReview(reviewId);
        res.json(reviews);
    }

    function updateReview(req, res) {
        var reviewId = req.params.id;
        var review = req.body;
        var reviews = reviewModel.updateReview(reviewId, review);
        res.json(reviews);
    }
}