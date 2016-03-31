var forms = require('./form.mock.json');
var q = require("q");

module.exports = function (db, mongoose) {
    var formSchema = require("./form.schema.server.js")(mongoose);
    var formModel = mongoose.model('Form', formSchema);

    var api = {
        createFormByUserId: createFormByUserId,
        findAllForms: findAllForms,
        findFormByUserId: findFormByUserId,
        findFormById: findFormById,
        updateFormById: updateFormById,
        deleteFormById: deleteFormById,
        findFormByTitle: findFormByTitle,
        getFormModel: getFormModel
    };

    return api;

    function getFormModel() {
        return formModel;
    }

    function createFormByUserId(form, userId) {
        form.userId = userId;
        form.fields = [];
        form.created = new Date();
        form.updated = new Date();
        return formModel.create(form);
    }

    function findAllForms() {
        return forms;
    }

    function findFormTitlesByUserId(userId) {
        var deferred = q.defer();
        findFormByUserId(userId)
            .then(function (userForms) {
                var titles = [];
                for (var i in userForms) {
                    titles.push(userForms[i].title);
                }
                console.log("titles: " + titles);
                q.resolve(titles);
            }, function (err) {
                q.reject();
            });
        return deferred.promise;
    }

    function findFormByUserId(userId) {
        return formModel.find({"userId": userId});
    }

    function findFormById(formId) {
        return formModel.findOne({_id: formId});
    }

    function findFormByTitle(title, userId) {
        return formModel.findOne({userId: userId, title: title});
    }

    function updateFormById(formId, form) {
        form.updated = new Date();
        if (form.title != "")
            return formModel.update({_id: formId}, {$set: form});
    }

    function deleteFormById(formId) {
        return formModel.remove({_id: formId});
    }
}