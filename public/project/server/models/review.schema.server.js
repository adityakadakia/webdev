module.exports = function (mongoose) {
    var reviewSchema = mongoose.Schema({
        description: String,
        timestamp: Date,
        placeId: String,
        userId: String,
        commentIds: [String],
        phones: [String],
        roles: [String]
    }, {collection: 'project.review'});
    return reviewSchema;
};