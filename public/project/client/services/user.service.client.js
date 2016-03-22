/**
 * Created by Aditya on 2/27/2016.
 */
"use strict";
(function () {
    angular
        .module("Voyager")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {
                "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                "username": "alice", "password": "alice", "roles": ["user"], "email": ""
            },
            {
                "_id": 234, "firstName": "Bob", "lastName": "Hope",
                "username": "bob", "password": "bob", "roles": ["admin"], "email": ""
            },
            {
                "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                "username": "charlie", "password": "charlie", "roles": ["user"], "email": ""
            },
            {
                "_id": 456, "firstName": "Dan", "lastName": "Craig",
                "username": "dan", "password": "dan", "roles": ["user", "admin"], "email": ""
            },
            {
                "_id": 567, "firstName": "Edward", "lastName": "Norton",
                "username": "ed", "password": "ed", "roles": ["user"], "email": ""
            }
        ];


        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            userIdtoFullUserName: userIdtoFullUserName,
            findUserByUsername: findUserByUsername
        };

        return api;

        function findUserByUsername(user, callback) {
            console.log(user.username);
            var currUser = null;
            for (var i = 0; i < users.length; i++) {
                if (users[i].username === user.username) {
                    currUser = users[i];
                    console.log(user.username + "user found");
                }
            }

            if (currUser != null) {
                console.log("Sending Null");
                callback(null);
            } else {
                callback(user);
            }
        }

        function userIdtoFullUserName(userId) {
            for (var i in users) {
                if (users[i]._id == userId) {
                    return users[i].firstName + " " + users[i].lastName;
                }
            }
        }
        function findUserByCredentials(username, password, callback) {
            for (var i in users) {
                if (users[i].username == username && users[i].password == password) {
                    callback(users[i]);
                    return;
                }
            }
            callback(null);
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function createUser(user, callback) {
            var u;
            u = {
                "_id": (new Date).getTime(),
                "firstName": "",
                "lastName": "",
                "username": user.username,
                "password": user.password,
                "email": user.email
            };
            console.log("Email: " + user.email)
            users.push(u);
            callback(u);
        }

        function deleteUserById(userId, callback) {
            for (var i in users) {
                if (users[i]._id == userId) {
                    users.splice(i, 1);
                    callback(users);
                    return;
                }
            }
            callback(users);
        }

        function updateUser(userId, user, callback) {
            for (var i in users) {
                if (users[i]._id == userId) {
                    users[i]._id = user._id;
                    users[i].firstName = user.firstName;
                    users[i].lastName = user.lastName;
                    users[i].username = user.username;
                    users[i].password = user.password;
                    users[i].email = user.email;
                    callback(users[i]);
                    return;
                }
            }
            callback(null);
        }
    }
})();
