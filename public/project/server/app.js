/**
 * Created by Aditya on 3/22/2016.
 */
"use strict";
module.exports = function (app, uuid) {
    var userModel = require("./models/user.model.server.js")(uuid);
    var userService = require("./services/user.service.server.js")(app, userModel);
}