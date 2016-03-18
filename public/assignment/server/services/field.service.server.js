module.exports = function (app, fieldModel) {
    app.get("/api/assignment/form/:formId/field", findAllFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldIdFormId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldIdFormId);
    app.post("/api/assignment/form/:formId/field", createFieldByFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldIdFormId);

    function findAllFieldsByFormId(req, res) {
        var formId = req.params.formId;
        var fields = fieldModel.findAllFieldsByFormId(formId);
        res.json(fields);
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
        var fields = fieldModel.deleteFieldIdFormId(formId, fieldId);
        res.json(fields);
    }

    function createFieldByFormId(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        var fields = fieldModel.createFieldByFormId(formId, field);
        res.json(fields);
    }

    function updateFieldIdFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        var fields = fieldModel.updateFieldIdFormId(formId, fieldId, field);
        res.json(fields);
    }
}