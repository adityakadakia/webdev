/**
 * Created by Aditya on 4/10/2016.
 */
module.exports = function (mongoose) {
    var venueSchema = mongoose.Schema({
        foursquareId: String,
        name: String,
        category: String,
        prefix: String,
        suffix: String
    }, {collection: 'project.venue'});
    return venueSchema;
};