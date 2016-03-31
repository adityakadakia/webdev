/**
 * Created by Aditya on 3/29/2016.
 */
module.exports = function (mongoose) {
    var fieldSchema = mongoose.Schema({
        "label": String,
        "type": {
            type: 'String',
            enum: ['TEXT', 'TEXTAREA', 'DATE', 'OPTIONS', 'CHECKBOXES', 'RADIOS']
        },
        "placeholder": String,
        options: [{
            label: String,
            value: String
        }]
    }, {collection: 'assignment.field'});
    return fieldSchema;
};