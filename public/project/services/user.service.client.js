/**
 * Created by Aditya on 2/27/2016.
 */
(function () {
    angular
        .module("Vouager")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {
                "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                "username": "alice", "password": "alice", "roles": ["user"]
            },
            {
                "_id": 234, "firstName": "Bob", "lastName": "Hope",
                "username": "bob", "password": "bob", "roles": ["admin"]
            },
            {
                "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                "username": "charlie", "password": "charlie", "roles": ["user"]
            },
            {
                "_id": 456, "firstName": "Dan", "lastName": "Craig",
                "username": "dan", "password": "dan", "roles": ["user", "admin"]
            },
            {
                "_id": 567, "firstName": "Edward", "lastName": "Norton",
                "username": "ed", "password": "ed", "roles": ["user"]
            }
        ];


        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return api;

        function findUserByCredentials(username, password, callback) {
            for (i in users) {
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
            users.push(u);
            callback(u);
        }

        function deleteUserById(userId, callback) {
            for (i in users) {
                if (users[i]._id == userId) {
                    users.splice(i, 1);
                    callback(users);
                    return;
                }
            }
            callback(users);
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
                    callback(users[i]);
                    return;
                }
            }
            callback(null);
        }
    }
})();
