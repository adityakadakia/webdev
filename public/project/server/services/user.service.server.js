/**
 * Created by Aditya on 3/22/2016.
 */
module.exports = function (app, userModel, security) {
    var passport = security.getPassport();
    var multer = require('multer');
    var upload = multer({dest: __dirname + '/../../../uploads'});
    var auth = authorized;

    app.post("/api/project/user", register);
    app.get("/api/project/user/loggedin", loggedin);
    app.put("/api/project/user/:id", update);
    app.get("/api/project/user", findAllUsers);
    app.get("/api/project/user/:id", findUserById);
    app.get("/api/project/user?username=username", findUserByUsername);
    app.get("/api/project/user?username=alice&password=wonderland", findUserByCredentials);
    app.delete("/api/project/user/:id", deleteUserById);
    app.post("/api/project/user/logout", logOut);
    app.post("/api/project/user/like/:placeId", likePlace);
    app.delete("/api/project/user/like/:placeId", unlikePlace);
    app.post("/api/project/user/follow/:followId", followUser);
    app.delete("/api/project/user/follow/:followId", unfollowUser);
    app.post("/api/project/user/profilepic/:id", upload.single('profilePic'), updateUserWithImage);
    app.post("/api/project/login", passport.authenticate('project'), login);
    app.post('/api/project/admin/user', auth, createUser);
    app.get('/api/project/admin/user', auth, findAllUsersAdmin);
    app.delete('/api/project/admin/user/:userId', auth, deleteUser);
    app.put('/api/project/admin/user/:userId', auth, updateUser);

    var userService = this;

    function createUser(req, res) {
        var newUser = req.body;
        if (newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    // if the user does not already exist
                    if (user == null) {
                        return userModel.createUser(newUser)
                            .then(
                                function () {
                                    return userModel.findAllUsers();
                                },
                                function (err) {
                                    console.log(err);
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return userModel.findAllUsers();
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function () {
                    res.status(400).send(err);
                }
            );
    }

    function findAllUsersAdmin(req, res) {
        if (isAdmin(req.user)) {
            userModel
                .findAllUsers()
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function () {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function updateUser(req, res) {
        var newUser = req.body;
        if (!isAdmin(req.user)) {
            delete newUser.roles;
        }
        if (typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        userModel
            .updateUser(req.params.userId, newUser)
            .then(
                function (user) {
                    return userModel.findAllUsers();
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req, res) {
        if (isAdmin(req.user)) {
            console.log("userService deleteUser: " + req.params.userId)
            userModel
                .deleteUserById(req.params.userId)
                .then(
                    function (user) {
                        return userModel.findAllUsers();
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                )
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }


    function isAdmin(user) {
        if (user.roles.indexOf("admin") > -1) {
            return true
        }
        return false;
    }

    function updateUserWithImage(req, res) {
        var userId = req.params.id;
        console.log("I am in server: " + userId);
        var model = req.body;
        var user = model;
        console.log(user);
        var imageFile = req.file;
        if (imageFile) {
            var destination = imageFile.destination;
            var path = imageFile.path;
            var originalname = imageFile.originalname;
            var size = imageFile.size;
            var mimetype = imageFile.mimetype;
            var filename = imageFile.filename;
            user.imgUrl = "/uploads/" + filename;
        }
        userModel.updateUserProfile(userId, user)
            .then(function (response) {
                    return userModel.findUserById(userId);
                },
                function (err) {
                    res.status(400).send(err);
                })
            .then(function (response) {
                req.session.currentUser = response;
                res.redirect(req.header('Referer') + "#/profile/" + userId);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function followUser(req, res) {
        var followId = req.params.followId;
        if (req.session.currentUser) {
            var userId = req.session.currentUser._id;
            if (userId != followId)
                userModel
                    .findUserById(userId)
                    .then(function (user) {
                        if (user.following.indexOf(followId) == -1) {
                            user.following.push(followId);
                            return userModel.updateUser(userId, user);
                        } else res.json(req.session.currentUser);
                    }, function (err) {
                        res.status(400).send(err);
                    })
                    .then(function (response) {
                        return userModel.findUserById(followId);
                    })
                    .then(function (response) {
                        var followUser = response;
                        followUser.followers.push(userId);
                        return userModel.updateUser(followId, followUser);
                    })
                    .then(function (response) {
                        return userModel.findUserById(userId);
                    })
                    .then(function (response) {
                        req.session.currentUser = response;
                        res.json(response);
                    });
        }
    }

    function unfollowUser(req, res) {
        var followId = req.params.followId;
        if (req.session.currentUser) {
            var userId = req.session.currentUser._id;
            if (userId != followId)
                userModel
                    .findUserById(userId)
                    .then(function (user) {
                        if (user.following.indexOf(followId) > -1) {
                            user.following.splice(user.following.indexOf(followId), 1);
                            return userModel.updateUser(userId, user);
                        } else res.json(req.session.currentUser);
                    }, function (err) {
                        console.log(err);
                        res.status(400).send(err);
                    })
                    .then(function (response) {
                        return userModel.findUserById(followId);
                    }, function (err) {
                        console.log(err);
                        res.status(401).send(err);
                    })
                    .then(function (response) {
                        var followUser = response;
                        followUser.followers.splice(followUser.followers.indexOf(userId), 1);
                        return userModel.updateUser(followId, followUser);
                    }, function (err) {
                        console.log(err);
                        res.status(402).send(err);
                    })
                    .then(function (response) {
                        return userModel.findUserById(userId);
                    }, function (err) {
                        console.log(err);
                        res.status(403).send(err);
                    })
                    .then(function (response) {
                        req.session.currentUser = response;
                        res.json(response);
                    }, function (err) {
                        console.log(err);
                        res.status(404).send(err);
                    });
        }
    }

    function unlikePlace(req, res) {
        var placeId = req.params.placeId;
        if (req.session.currentUser) {
            var userId = req.session.currentUser._id;
            userModel
                .findUserById(userId)
                .then(function (user) {
                    if (user.likes.indexOf(placeId) > -1) {
                        console.log("UserService unlikePlace");
                        user.likes.splice(user.likes.indexOf(placeId), 1);
                        return userModel.updateUser(userId, user);
                    }
                    else
                        res.json(req.session.currentUser);
                }, function (err) {
                    console.log(err);
                    res.status(400).send(err);
                })
                .then(function (response) {
                    return userModel.findUserById(userId);
                }, function (err) {
                    console.log(err);
                    res.status(401).send(err);
                })
                .then(function (response) {
                    req.session.currentUser = response;
                    console.log("unlike: current user: " + JSON.stringify(req.session.currentUser.username) + " " + JSON.stringify(req.session.currentUser.likes));
                    res.json(response);
                }, function (err) {
                    console.log(err);
                    res.status(402).send(err);
                });
        }
    }

    function likePlace(req, res) {
        var placeId = req.params.placeId;
        if (req.session.currentUser) {
            var userId = req.session.currentUser._id;
            userModel
                .findUserById(userId)
                .then(
                    function (user) {
                        if (user.likes.indexOf(placeId) == -1) {
                            console.log("UserService likePlace");
                            user.likes.push(placeId);
                            return userModel.updateUser(userId, user);
                        }
                        else
                            res.json(req.session.currentUser);
                    }, function (err) {
                        res.status(400).send(err);
                    })
                .then(
                    function (response) {
                        return userModel.findUserById(userId);
                    })
                .then(
                    function (response) {
                        req.session.currentUser = response;
                        console.log("like: current user: " + JSON.stringify(req.session.currentUser.username) + " " + JSON.stringify(req.session.currentUser.likes));
                        res.json(response);
                    });
        }
    }

    function logOut(req, res) {
        console.log("UserService logOut");
        req.session.destroy();
        //res.send(200);
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
        user.roles = ['user'];
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
                function (doc) {
                    req.login(doc, function (err) {
                        if (err) {
                            res.status(400).send(err);
                        }
                        else {
                            res.json(doc);
                        }
                    });
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function loggedin(req, res) {
        console.log("loggedin current user: " + JSON.stringify(req.session.currentUser));
        //res.json(req.session.currentUser);
        res.send(req.isAuthenticated() && req.user.type == "project" ? req.user : null);
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

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    function login(req, res) {
        var user = req.user;
        req.session.currentUser = user;
        res.json(user);
    }

}