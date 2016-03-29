/**
 * Created by Aditya on 3/29/2016.
 */
module.exports = function (mongoose) {

    // use mongoose to declare a user schema
    var userSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phones: [String],
        roles: [String]
        // collection property sets
        // collection name to 'user'
    }, {collection: 'assignment.user'});
    return userSchema;
};