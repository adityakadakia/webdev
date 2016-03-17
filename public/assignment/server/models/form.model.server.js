var forms = require('./form.mock.json');

module.exports = function (uuid) {

    var api = {
        createFormByUserId: createFormByUserId,
        findAllForms: findAllForms,
        findFormByUserId: findFormByUserId,
        findFormById: findFormById,
        updateFormById: updateFormById,
        deleteFormById: deleteFormById,
        findFormByTitle: findFormByTitle
    };

    return api;

    function createFormByUserId(form, userId) {
        form._id = uuid.v4();
        form.userId = userId;
        forms.push(form);
        console.log(forms);
        return forms;
    }

    function findAllForms() {
        return forms;
    }

    function findFormByUserId(userId) {
        var f;
        for (i in forms) {
            if (userId == forms[i].userId) {
                f.push(forms[i]);
            }
        }
        return f;
    }

    function findFormById(formId) {
        for (i in forms) {
            if (formId == forms[i]._id) {
                return forms[i];
            }
        }
        return null;
    }

    function findFormByTitle(title, userId) {
        var form;
        for (var i in forms) {
            if (forms[i].title == title && forms[i].userId == userId) {
                form = forms[i];
                console.log(form);
                return (form);
            }
        }
    }

    function updateFormById(formId, form) {
        for (var i in forms) {
            if (formId == forms[i]._id) {
                forms[i] = form;
                console.log(forms);
                return forms;
            }
        }
        return null;
    }

    function deleteFormById(formId) {
        var index;
        for (var i in forms) {
            if (formId == forms[i]._id) {
                index = i;
            }
        }
        forms.splice(index, 1);
        //console.log(forms);
        return forms;
    }
}