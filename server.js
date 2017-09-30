var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var uuid = require('node-uuid');
var mongoose = require('mongoose');
var passport = require('passport');

var connectionString = 'mongodb://127.0.0.1:27017/webdev';
if(process.env.MONGODB_PASSWORD) {
    connectionString = process.env.MONGODB_USER + ":" +
        process.env.MONGODB_PASSWORD + "@" +
        process.env.MONGODB_SERVICE_HOST + ':' +
        process.env.MONGODB_SERVICE_PORT + '/' +
        'webdevelopment';
}
var db = mongoose.connect(connectionString);

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());
app.use(session({secret: process.env.SESSION_SECRET}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

var ipaddress = 0.0.0.0;
var port = 8080;

var userModelAssignment = require("./public/assignment/server/models/user.model.server.js")(db, mongoose);
var userModelProject = require("./public/project/server/models/user.model.server.js")(db, mongoose);
var security = require("./public/security/security.js")(userModelAssignment, userModelProject);

require("./public/assignment/server/app.js")(app, db, mongoose, uuid, userModelAssignment, security);
require("./public/project/server/app.js")(app, db, mongoose, userModelProject, security);
app.listen(port, ipaddress);
