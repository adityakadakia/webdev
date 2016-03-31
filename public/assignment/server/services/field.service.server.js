module.exports = function (app, fieldModel) {
    app.get("/api/assignment/form/:formId/field", findAllFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldIdFormId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldIdFormId);
    app.post("/api/assignment/form/:formId/field", createFieldByFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldIdFormId);
    app.put("/api/assignment/form/:formId/field/:start/:end", sortFields);

    function findAllFieldsByFormId(req, res) {
        var formId = req.params.formId;
        var fields = fieldModel
            .findAllFieldsByFormId(formId)
            .then(function (form) {
                    res.json(form.fields);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function findFieldIdFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = fieldModel.findFieldIdFormId(formId, fieldId);
        res.json(field);
    }

    function deleteFieldIdFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel
            .deleteFieldIdFormId(formId, fieldId)
            .then(function (form) {
                res.json(form.fields);
            }, function (err) {
                console.log(err);
                res.status(400).send(err);
            });
    }

    function createFieldByFormId(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        delete field._id;
        fieldModel
            .createFieldByFormId(formId, field)
            .then(function (form) {
                res.json(form.fields);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function updateFieldIdFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        var fields = fieldModel
            .updateFieldIdFormId(formId, fieldId, field)
            .then(function (form) {
                res.json(form.fields);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function sortFields(req, res) {
        var formId = req.params.formId;
        var start = req.params.start;
        var end = req.params.end;
        fieldModel
            .sortFields(formId, start, end)
            .then(function (form) {
                res.json(form.fields);
            }, function (err) {
                res.status(400).send(err);
            });
    }
}