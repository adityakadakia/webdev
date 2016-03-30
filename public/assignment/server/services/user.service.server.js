module.exports = function (app, userModel) {

    app.post("/api/assignment/user", register);
    app.get("/api/assignment/user/loggedin", loggedin);
    app.put("/api/assignment/user/:id", update);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=username", findUserByUsername);
    app.get("/api/assignment/user?username=alice&password=wonderland", findUserByCredentials);
    app.delete("/api/assignment/user/:id", deleteUserById);
    app.post("/api/assignment/user/logout", logOut);

    var userService = this;

    function logOut(req, res) {
        console.log("UserService logOut");
        req.session.destroy();
        res.send(200);
    }

    function deleteUserById(req, res) {
        console.log("UserService deleteUserById");
        var userId = req.params.id;
        var users = userModel
            .deleteUserById(userId)
            .then(function (doc) {
                    userModel
                        .findAllUsers()
                        .then(function (doc1) {
                                res.json(doc1);
                            },
                            function (err) {
                                res.status(400).send(err);
                            })
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function findUserById(req, res) {
        console.log("UserService findUserById");
        var userId = req.params.id;
        userModel
            .findUserById(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function findAllUsers(req, res) {
        console.log("UserService findAllUsers");
        var username = req.query.username;
        var password = req.query.password;
        console.log("username: " + username);
        console.log("password: " + password);
        if (username != null && password != null) {
            userModel
                .findUserByCredentials(username, password)
                .then(
                    function (doc) {
                        req.session.currentUser = doc;
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    })
        } else if (username != null) {
            userModel
                .findUserByUsername(username)
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    })
        } else {
            userModel
                .findAllUsers()
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    })
        }
    }

    function register(req, res) {
        console.log("UserService register");
        var user = req.body;
        user = userModel.createUser(user)
            // handle model promise
            .then(
                // login user if promise resolved
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function loggedin(req, res) {
        console.log("loggedin current user: " + JSON.stringify(req.session.currentUser));
        res.json(req.session.currentUser);
    }

    function update(req, res) {
        console.log("UserService update");
        var user = req.body;
        var userId = req.params.id;
        var users = userModel
            .updateUser(userId, user)
            .then(
                function (doc) {
                    return userModel.findUserById(userId);
                },
                function (err) {
                    res.status(400).send(err);
                })
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                });
        console.log("updated current user: " + JSON.stringify(req.session.currentUser));
    }

    function findUserByCredentials(req, res) {
        console.log("UserService findUserByCredentials");
    }

    function findUserByUsername(req, res) {
        console.log("UserService findUserByUsername");
    }

}