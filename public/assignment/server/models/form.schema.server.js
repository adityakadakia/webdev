/**
 * Created by Aditya on 3/29/2016.
 */
module.exports = function (mongoose) {
    var fieldSchema = require('./field.schema.server.js')(mongoose);
    var formSchema = mongoose.Schema({
        "title": String,
        "userId": String,
        "fields": [fieldSchema]
    }, {collection: 'assignment.form'});
    return formSchema;
};
