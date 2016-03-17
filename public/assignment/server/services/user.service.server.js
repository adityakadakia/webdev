module.exports = function (app, formModel, userModel) {

    app.post("/api/assignment/user", register);
    app.get("/api/assignment/user/loggedin", loggedin);
    app.put("/api/assignment/user/:id", update)

    function register(req, res) {
        var user = req.body;
        var users = userModel.createUser(user);
        req.session.currentUser = user;
        res.json(users);
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function update(req, res) {
        console.log("UserService update");
        var user = req.body;
        var userId = req.params.id;
        var users = userModel.updateUser(userId, user);
        console.log(users);
        for (var i = 0; i < users.length; i += 1) {
            user = users[i];
            if (user._id === userId) {
                res.json(user);
            }
        }
    }
}