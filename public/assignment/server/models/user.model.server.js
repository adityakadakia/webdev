var users = require("./user.mock.json");

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
        for (i in users) {
            if (users[i]._id == userId) {
                return users[i];
            }
        }
        return null;
    }

    function findUserByCredentials(username, password) {
        console.log("userModel findUserbyCredentials");
        for (i in users) {
            if (users[i].username == username && users[i].password == password) {
                return (users[i]);
            }
        }
        return null;
    }

    function findUserByUsername(username) {
        console.log("userModel findUserbyUsername");
        var currUser = null;
        for (var i = 0; i < users.length; i++) {
            if (users[i].username === username) {
                currUser = users[i];
                return currUser;
                console.log(users[i].username + "user found");
            }
        }
        return null;
    }

    function findAllUsers() {
        console.log("userModel findAllUsers")
        return users;
    }

    function createUser(user) {
        console.log("userModel createUser");
        var u;
        var usernames = listUsernames();
        if (usernames.indexOf(user.username) > -1)
            return null;
        u = {
            "_id": uuid.v4(),
            "firstName": "",
            "lastName": "",
            "username": user.username,
            "password": user.password,
            "email": user.email
        };
        users.push(u);
        return users;
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
        for (i in users) {
            if (users[i]._id == userId) {
                users.splice(i, 1);
                return (users);
            }
        }
        return users;
    }

    function updateUser(userId, user) {
        console.log("userModel updateUser");
        for (i in users) {
            if (users[i]._id == userId) {
                users[i]._id = user._id;
                users[i].firstName = user.firstName;
                users[i].lastName = user.lastName;
                users[i].username = user.username;
                users[i].password = user.password;
                users[i].email = user.email;
                return users;
            }
        }
        return null;
    }
}