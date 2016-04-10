/**
 * Created by Aditya on 4/9/2016.
 */
module.exports = function (mongoose) {

    // use mongoose to declare a user schema
    var userSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        phones: [String],
        likes: [String],
        roles: [String]
        // collection property sets
        // collection name to 'user'
    }, {collection: 'project.user'});
    return userSchema;
};