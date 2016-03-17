var users = require("./user.mock.json");

module.exports = function (uuid) {

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
        for (i in users) {
            if (users[i]._id == userId) {
                return users[i];
            }
        }
        return null;
    }

    function findUserByCredentials(username, password) {
        for (i in users) {
            if (users[i].username == username && users[i].password == password) {
                return (users[i]);
            }
        }
        return null;
    }

    function findUserByUsername(username) {
        console.log(username);
        var currUser = null;
        for (var i = 0; i < users.length; i++) {
            if (users[i].username === username) {
                currUser = users[i];
                console.log(users[i].username + "user found");
            }
        }

        if (currUser != null) {
            console.log("Sending Null");
            return null;
        } else {
            return currUser;
        }
    }

    function findAllUsers() {
        return users;
    }

    function createUser(user) {
        var u;
        u = {
            "_id": (new Date).getTime(),
            "firstName": "",
            "lastName": "",
            "username": user.username,
            "password": user.password,
            "email": user.email
        };
        users.push(u);
        return users;
    }

    function deleteUserById(userId) {
        for (i in users) {
            if (users[i]._id == userId) {
                users.splice(i, 1);
                return (users);
            }
        }
        return users;
    }

    function updateUser(userId, user, callback) {
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