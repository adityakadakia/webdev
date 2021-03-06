/**
 * Created by Aditya on 4/9/2016.
 */
module.exports = function (mongoose) {

    // use mongoose to declare a user schema
    var userSchema = mongoose.Schema({
        username: String,
        imgUrl: String,
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        phones: [String],
        likes: [String],
        following: [String],
        followers: [String],
        roles: [String],
        type: {type: String, default: "project"}
        // collection property sets
        // collection name to 'user'
    }, {collection: 'project.user'});
    return userSchema;
};