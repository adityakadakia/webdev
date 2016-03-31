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
        var formIndex;
        var fieldIndex;
        for (i in forms) {
            if (forms[i]._id == formId) {
                for (j in forms[i].fields) {
                    if (forms[i].fields[j]._id == fieldId) {
                        formIndex = i;
                        fieldIndex = j;
                    }
                }
            }
        }
        forms[formIndex].fields.splice(fieldIndex, 1);
        console.log(JSON.stringify(forms));
        return forms[formIndex].fields;
    }

    function createFieldByFormId(formId, field) {
        return formModel.findById(formId)
            .then(
                function (form) {
                    form.fields.push(field);
                    return form.save();
                }
            );
        //for (i in forms) {
        //    if (forms[i]._id == formId) {
        //        field._id = uuid.v4();
        //        if (!forms[i].fields)
        //            forms[i].fields = [];
        //        forms[i].fields.push(field);
        //        return forms[i].fields
        //    }
        //}
        //return null;
    }

    function updateFieldIdFormId(formId, fieldId, field) {
        for (i in forms) {
            if (forms[i]._id == formId) {
                for (j in forms[i].fields) {
                    if (forms[i].fields[j]._id == fieldId) {
                        console.log(JSON.stringify(field));
                        forms[i].fields[j] = field;
                        console.log(JSON.stringify(forms));
                        return forms[i].fields;
                    }
                }
            }
        }
        return null;
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
