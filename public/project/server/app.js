/**
 * Created by Aditya on 3/22/2016.
 */
"use strict";
module.exports = function (app, db, mongoose, uuid) {
    //var userModel = require("./models/user.model.server.js")(uuid);
    var userModel = require("./models/user.model.server.js")(db, mongoose);
    var reviewModel = require("./models/review.model.server.js")(db, mongoose, uuid);
    var userService = require("./services/user.service.server.js")(app, userModel);
    var reviewService = require("./services/review.service.server.js")(app, reviewModel);
}