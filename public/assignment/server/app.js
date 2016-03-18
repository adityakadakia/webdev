/**
 * Created by Aditya on 3/15/2016.
 */
module.exports = function (app, uuid) {

    // pass db and mongoose reference to model
    var fieldModel = require("./models/field.model.server.js")(uuid);
    var formModel = require("./models/form.model.server.js")(uuid);
    var userModel = require("./models/user.model.server.js")(uuid);

    var formService = require("./services/field.service.server.js")(app, fieldModel);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var userService = require("./services/user.service.server.js")(app, userModel);
}