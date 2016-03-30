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
        var deferred = q.defer();
        userModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                // resolve promise
                console.log("findUserById doc: ");
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials(username, password) {
        console.log("userModel findUserbyCredentials");
        var deferred = q.defer();
        userModel.findOne({username: username, password: password}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                // resolve promise
                console.log("findUserbyCredentials doc: ");
                console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        console.log("userModel findUserbyUsername");
        var deferred = q.defer();
        userModel.findOne({username: username}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                // resolve promise
                console.log("findUserbyUsername doc: ");
                console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllUsers() {
        console.log("userModel findAllUsers");
        var deferred = q.defer();
        userModel.find(function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function createUser(user) {
        console.log("userModel createUser");
        var deferred = q.defer();
        // insert new user with mongoose user model's create()
        userModel.create(user, function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                console.log("doc: ");
                console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
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
        var deferred = q.defer();
        userModel.remove({_id: userId}, function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                console.log("doc: ");
                console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateUser(userId, user) {
        console.log("userModel updateUser");
        var deferred = q.defer();
        userModel.update({_id: userId},
            {$set: user},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    console.log("doc: ");
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }
}