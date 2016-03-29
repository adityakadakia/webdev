/**
 * Created by Aditya on 3/15/2016.
 */
"use strict";
module.exports = function (app, db, mongoose, uuid) {

    // pass db and mongoose reference to model
    var fieldModel = require("./models/field.model.server.js")(db, mongoose, uuid);
    var formModel = require("./models/form.model.server.js")(db, mongoose, uuid);
    var userModel = require("./models/user.model.server.js")(db, mongoose);

    var formService = require("./services/field.service.server.js")(app, fieldModel);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var userService = require("./services/user.service.server.js")(app, userModel);
}