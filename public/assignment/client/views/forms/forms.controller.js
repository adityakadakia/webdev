"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, UserService) {

        var model = this;
        init();

        function init() {
            console.log("FormController init");
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        UserService.setCurrentUser(user);
                        console.log("current user: " + JSON.stringify(user));
                        updateFormsForCurrentUser(user._id);
                    }
                });
        }

        model.addForm = addForm;
        model.updateForm = updateForm;
        model.deleteForm = deleteForm;
        model.selectForm = selectForm;
        model.selected = -1;

        function addForm(form) {
            console.log("FormController addForm");
            if (form) {
                console.log(JSON.stringify(form));
                UserService
                    .getCurrentUser()
                    .then(function (response) {
                        var user = response.data;
                        console.log("current userId: " + user._id + JSON.stringify(form));
                        if (user) {
                            FormService
                                .createFormForUser(user._id, form)
                                .then(function (response) {
                                    updateFormsForCurrentUser();
                                });
                        }
                    });
            }
        }

        function updateForm(form) {
            console.log("FormController updateForm");
            if (form) {
                FormService
                    .updateFormById(form._id, form)
                    .then(function (response) {
                        updateFormsForCurrentUser();
                    })
            }
        }

        function deleteForm(formId) {
            console.log("FormController deleteForm");
            FormService
                .deleteFormById(formId)
                .then(function (response) {
                    updateFormsForCurrentUser();
                })
        }

        function selectForm(index) {
            console.log("FormController selectForm");
            var editForm = {
                "_id": model.forms[index]["_id"],
                "userId": model.forms[index]["userId"],
                "title": model.forms[index]["title"],
                "fields": model.forms[index]["fields"]
            };
            model.form = editForm;
            model.selected = index;
        }

        function updateFormsForCurrentUser() {
            console.log("FormController updateFormsForCurrentUser");
            UserService.getCurrentUser().then(function (response) {
                var userId = response.data._id;
                FormService.findAllFormsForUser(userId).then(function (response) {
                    model.forms = response.data;
                    model.form = null;
                    console.log(JSON.stringify(response.data));
                }, function (err) {
                    console.log(err);
                })
            })
        }
    }
})();