var users = require("./user.mock.json");
var q = require("q");

module.exports = function (db, mongoose) {

    var userSchema = require("./user.schema.server.js")(mongoose);
    var userModel = mongoose.model('User', userSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById
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
        console.log("userModel createUser");
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
        console.log("userModel updateUser");
        return userModel.update({_id: userId}, {$set: user});
    }
}