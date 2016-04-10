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
        reviewModel
            .findReviewByPlaceId(placeId)
            .then(function (reviews) {
                res.json(reviews);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function addReview(req, res) {
        var review = req.body;
        var userId = req.session.currentUser._id;
        var placeId = req.params.placeId;
        reviewModel
            .addReview(review, userId, placeId)
            .then(function (res) {
                return reviewModel.findReviewByPlaceId(placeId);
            }, function (err) {
                res.status(401).send(err);
            })
            .then(function (reviews) {
                res.json(reviews);
            }, function (err) {
                console.log(err);
                res.status(402).send(err);
            });
    }

    function deleteReview(req, res) {
        var reviewId = req.params.id;
        reviewModel
            .deleteReview(reviewId)
            .then(function (response) {
                res.json(response);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function updateReview(req, res) {
        var reviewId = req.params.id;
        var review = req.body;
        var reviews = reviewModel.updateReview(reviewId, review);
        res.json(reviews);
    }
}