var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
module.exports = function (app, userModel) {
    var auth = authorized;

    app.post("/api/assignment/user", register);
    app.get("/api/assignment/user/loggedin", loggedin);
    app.put("/api/assignment/user/:id", update);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=username", findUserByUsername);
    app.get("/api/assignment/user?username=alice&password=wonderland", findUserByCredentials);
    app.delete("/api/assignment/user/:id", deleteUserById);
    app.post("/api/assignment/user/logout", logOut);
    app.post("/api/assignment/login", passport.authenticate('local'), login);
    //app.post  ('/api/assignment/user', auth, createUser);

    var userService = this;

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        console.log("userService localStrategy: " + username + " " + password);
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }


    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logOut(req, res) {
        console.log("UserService logOut");
        //req.session.destroy();
        req.logOut();
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
        user.roles = ['student'];
        console.log("Register: " + JSON.stringify(user));
        userModel.findUserByUsername(user.username)
            .then(
                function (u) {
                    if (!u)
                        return userModel.createUser(user);
                    else
                        res.status(400).send("Duplicate User");
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function loggedin(req, res) {
        console.log("loggedin current user: " + JSON.stringify(req.session.currentUser));
        //res.json(req.session.currentUser);
        res.send(req.isAuthenticated() ? req.user : '');
    }

    function update(req, res) {
        console.log("UserService update");
        var user = req.body;
        var userId = req.params.id;
        var users = userModel
            .updateUser(userId, user)
            .then(
                function (doc) {
                    return userModel.findUserById(req.session.currentUser._id);
                },
                function (err) {
                    res.status(400).send(err);
                })
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
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