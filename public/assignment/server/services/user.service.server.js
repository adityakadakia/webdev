module.exports = function (app, formModel, userModel) {

    app.post("/api/assignment/user", register);

    function register(req, res) {
        var user = req.body;
        var users = userModel.createUser(user);
        req.session.currentUser = user;
        res.json(users);
    }
}