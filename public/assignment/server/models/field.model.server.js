var forms = require("./form.mock.json");

module.exports = function (db, mongoose, FormModel, uuid) {

    formModel = FormModel.getFormModel();

    var api = {
        findAllFieldsByFormId: findAllFieldsByFormId,
        findFieldIdFormId: findFieldIdFormId,
        deleteFieldIdFormId: deleteFieldIdFormId,
        createFieldByFormId: createFieldByFormId,
        updateFieldIdFormId: updateFieldIdFormId,
        sortFields: sortFields,
        findFormIndexById: findFormIndexById
    }

    return api;

    function findAllFieldsByFormId(formId) {
        return formModel.findById(formId).select("fields");
    }

    function findFieldIdFormId(formId, fieldId) {
        findAllFieldsByFormId(formId)
            .then(function (form) {
                return form.fields.id(fieldId);
            });
    }

    function deleteFieldIdFormId(formId, fieldId) {
        return formModel
            .findById(formId)
            .then(
                function (form) {
                    console.log(JSON.stringify(form.fields));
                    form.fields.id(fieldId).remove();
                    return form.save();
                }
            );
    }

    function createFieldByFormId(formId, field) {
        return formModel.findById(formId)
            .then(
                function (form) {
                    form.fields.push(field);
                    return form.save();
                }
            );
    }

    function updateFieldIdFormId(formId, fieldId, field) {
        return formModel
            .findById(formId)
            .then(
                function (form) {
                    form.updated = new Date();
                    var f = form.fields.id(field._id);
                    f.label = field.label;
                    f.placeholder = field.placeholder;
                    f.options = field.options;
                    return form.save();
                }
            );
    }

    function sortFields(formId, start, end) {
        var fields = findAllFieldsByFormId(formId);
        fields.splice(end, 0, fields.splice(start, 1)[0]);
        var formIndex = findFormIndexById(formId);
        console.log(formIndex);
        forms[formIndex].fields = fields;
        console.log(fields);
        return fields;
    }

    function findFormIndexById(formId) {
        for (var i in forms) {
            if (forms[i]._id == formId) {
                return i;
            }
        }
        return null;
    }
}
