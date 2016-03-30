/**
 * Created by Aditya on 3/29/2016.
 */
var fieldSchema = require('./field.schema.server.js');
module.exports = function (mongoose) {
    var formSchema = mongoose.Schema({
        "title": String,
        "userId": Number,
        "fields": fieldSchema
    }, {collection: 'assignment.form'});
    return formSchema;
};