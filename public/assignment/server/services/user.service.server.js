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
        var users = userModel.deleteUserById(userId);
        res.json(users);
    }

    function findUserById(req, res) {
        console.log("UserService findUserById");
        var userId = req.params.id;
        var user = userModel.findUserById(userId);
    }

    function findAllUsers(req, res) {
        console.log("UserService findAllUsers");
        var username = req.query.username;
        var password = req.query.password;
        console.log("username: " + username);
        console.log("password: " + password);
        if (username != null && password != null) {
            var user = userModel.findUserByCredentials(username, password);
            if (user)
                req.session.currentUser = user;
            res.json(user);
        } else if (username != null) {
            var user = userModel.findUserByUsername(username);
            res.json(user);
        } else {
            var users = userModel.findAllUsers();
            res.json(users);
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
                    res.json(user);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
        //var users = userModel.createUser(user);
        //req.session.currentUser = userModel.findUserByUsername(user.username);
        //res.json(users);
    }

    function loggedin(req, res) {
        console.log("loggedin current user: " + JSON.stringify(req.session.currentUser));
        res.json(req.session.currentUser);
    }

    function update(req, res) {
        console.log("UserService update");
        var user = req.body;
        var userId = req.params.id;
        var users = userModel.updateUser(userId, user);
        var user = userModel.findUserById(userId);
        req.session.currentUser = user;
        console.log("updated current user: " + JSON.stringify(req.session.currentUser));
        res.json(user);
    }

    function findUserByCredentials(req, res) {
        console.log("UserService findUserByCredentials");
    }

    function findUserByUsername(req, res) {
        console.log("UserService findUserByUsername");
    }

}