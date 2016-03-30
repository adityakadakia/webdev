module.exports = function (app, formModel) {

    app.get("/api/assignment/user/:userId/form", findFormByUserId);
    app.get("/api/assignment/form/:formId", findFormById);
    app.get("/api/assignment/user/:userId/form/:title", findFormByTitle);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormByUserId);
    app.put("/api/assignment/form/:formId", updateFormById);

    function findFormByUserId(req, res) {
        var userId = req.params.userId;
        var forms = formModel
            .findFormByUserId(userId)
            .then(
                function (forms) {
                    res.json(forms);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        var form = formModel.findFormById(formId);
        res.json(form);
    }

    function findFormByTitle(req, res) {
        var userId = req.params.userId;
        var title = req.params.title;
        var form = formModel.findFormByTitle(title, userId);
        res.json(form);
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        var forms = formModel.deleteFormById(formId);
        res.json(forms);
    }

    function createFormByUserId(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        formModel
            .createFormByUserId(form, userId)
            .then(
                function (doc) {
                    return formModel.findFormByUserId(userId);
                },
                function (err) {
                    res.status(400).send(err);
                }
            ).then(
            function (forms) {
                res.json(forms);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        var forms = formModel.updateFormById(formId, form);
        res.json(forms);
    }
}