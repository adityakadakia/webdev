/**
 * Created by Aditya on 3/15/2016.
 */
module.exports = function (app) {

    // pass db and mongoose reference to model
    var formModel = require("./models/forms.model.js")();
    var userModel = require("./models/user.model.js")();

    var formService = require("./services/forms.service.server.js")(app, formModel, userModel);
    var userService = require("./services/user.service.server.js")(app, formModel, userModel);
}