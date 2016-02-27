/**
 * Created by Aditya on 2/24/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo", "userId": 123},
            {"_id": "020", "title": "CDs", "userId": 234},
        ];

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return api;

        function createFormForUser(userId, form, callback) {
            var _id = (new Date).getTime();
            if (!(form.title === undefined)) {
                var form = {
                    "_id": _id,
                    "title": form.title,
                    "userId": userId
                };
                forms.push(form);
            }

            callback(form);

        }

        function findAllFormsForUser(userId, callback) {
            var usrforms = [];
            for (i in forms) {
                if (forms[i].userId == userId) {
                    usrforms.push(forms[i]);
                }
            }
            callback(usrforms);
        }

        function deleteFormById(formId, callback) {
            for (i in forms) {
                if (forms[i]._id == formId) {
                    forms.splice(i, 1);
                    callback(forms);
                    return;
                }
            }
            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            var i = getFormIndexByFormId(formId);
            if (!(newForm.title === undefined)) {
                forms[i] = {
                    "_id": newForm._id,
                    "title": newForm.title,
                    "userId": newForm.userId
                };
            }
            callback(forms[i]);
        }

        function getFormIndexByFormId(formId) {
            var index = 0;
            for (i in forms) {
                if (forms[i]._id === formId) {
                    return index;
                }
                index++;
            }
        }
    }
})();