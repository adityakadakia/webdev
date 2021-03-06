/**
 * Created by Aditya on 3/22/2016.
 */
"use strict";
module.exports = function (app, db, mongoose, userModel, security) {

    var reviewModel = require("./models/review.model.server.js")(db, mongoose);
    var venueModel = require("./models/venue.model.server.js")(db, mongoose);
    var userService = require("./services/user.service.server.js")(app, userModel, security);
    var reviewService = require("./services/review.service.server.js")(app, reviewModel);
    var venueService = require("./services/venue.service.server.js")(app, venueModel);
}