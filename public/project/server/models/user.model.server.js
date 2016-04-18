/**
 * Created by Aditya on 3/22/2016.
 */
var q = require("q");

module.exports = function (db, mongoose) {

    var userSchema = require("./user.schema.server.js")(mongoose);
    var userModel = mongoose.model('User-Project', userSchema);


    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        updateUserProfile: updateUserProfile
    };

    return api;

    function findUserById(userId) {
        console.log("userModel findUserById");
        return userModel.findById(userId);
    }

    function findUserByCredentials(username, password) {
        console.log("userModel findUserbyCredentials");
        return userModel.findOne({username: username, password: password});
    }

    function findUserByUsername(username) {
        console.log("userModel findUserbyUsername");
        return userModel.findOne({username: username});
    }

    function findAllUsers() {
        console.log("userModel findAllUsers");
        return userModel.find();
    }

    function createUser(user) {
        console.log("userModel createUser: " + JSON.stringify(user));
        if (user.emails)
            user.emails = user.emails.toString().split(",");
        return userModel.create(user);
    }

    function listUsernames() {
        var usernames = [];
        for (i in users) {
            usernames.push(users[i].username);
        }
        return usernames;
    }

    function deleteUserById(userId) {
        console.log("userModel deleteUserById");
        return userModel.remove({_id: userId});
    }

    function updateUser(userId, user) {
        console.log("userModel updateUser", user);
        console.log("userId: " + userId);
        console.log("-------------------------------------------------");
        console.log(userId);
        console.log(user.imgUrl);
        console.log("-------------------------------------------------");
        delete user._id;
        //var emails = user.emails.toString().split(",");
        //user.emails = emails;
        return userModel.update({_id: userId}, {
            $set: {
                username: user.username,
                imgUrl: user.imgUrl,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                //emails: user.emails,
                likes: user.likes,
                following: user.following,
                followers: user.followers,
                roles: user.roles
            }
        });
    }

    function updateUserProfile(userId, user) {
        console.log("userModel updateUser", user);
        console.log("userId: " + userId);
        console.log("-------------------------------------------------");
        console.log(userId);
        console.log(user.imgUrl);
        console.log("-------------------------------------------------");
        delete user._id;
        var emails = user.emails.toString().split(",");
        user.emails = emails;
        return userModel.update({_id: userId}, {
            $set: {
                username: user.username,
                imgUrl: user.imgUrl,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                emails: user.emails,
            }
        });
    }
}