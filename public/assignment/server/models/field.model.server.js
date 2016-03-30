var forms = require("./form.mock.json");

module.exports = function (db, mongoose, uuid) {

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
        var fields;
        for (i in forms) {
            if (forms[i]._id == formId) {
                fields = forms[i].fields;
                return fields;
            }
        }
        return null;
    }

    function findFieldIdFormId(formId, fieldId) {
        var field;
        for (i in forms) {
            if (forms[i]._id == formId) {
                for (j in forms[i].fields) {
                    if (forms[i].fields[j]._id == fieldId) {
                        return forms[i].fields[j];
                    }
                }
            }
        }
        return null;
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
        for (i in forms) {
            if (forms[i]._id == formId) {
                field._id = uuid.v4();
                if (!forms[i].fields)
                    forms[i].fields = [];
                forms[i].fields.push(field);
                return forms[i].fields
            }
        }
        return null;
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