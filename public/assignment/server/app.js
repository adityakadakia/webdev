/**
 * Created by Aditya on 3/15/2016.
 */
"use strict";
module.exports = function (app, db, mongoose, uuid, userModel, security) {

    // pass db and mongoose reference to model
    var formModel = require("./models/form.model.server.js")(db, mongoose);
    var fieldModel = require("./models/field.model.server.js")(db, mongoose, formModel, uuid);

    var formService = require("./services/field.service.server.js")(app, fieldModel);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var userService = require("./services/user.service.server.js")(app, userModel, security);
}