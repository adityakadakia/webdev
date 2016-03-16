(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, FormService) {

        var loggedInUser = $rootScope.user;
        var userId = -1;
        var model = this;

        if (loggedInUser != undefined) {
            userId = loggedInUser._id;
            updateFormsForCurrentUser();
        }

        model.addForm = addForm;
        model.updateForm = updateForm;
        model.deleteForm = deleteForm;
        model.selectForm = selectForm;
        model.selected = -1;

        function addForm(form) {
            console.log("FormController addForm");
            if (!(form == undefined))
                FormService.createFormForUser(userId, form, function (newForm) {
                    $scope.selected = -1;
                    $scope.form = {};
                    updateFormsForCurrentUser()
                });
        }

        function updateForm(form) {
            console.log("FormController updateForm");
            if (!(form === undefined))
            FormService.updateFormById(form._id, form, function (newForm) {
                $scope.selected = -1;
                $scope.form = {};
                updateFormsForCurrentUser();
            });
        }

        function deleteForm(formId) {
            console.log("FormController deleteForm");
            FormService.deleteFormById(formId, function (udpatedForms) {
                updateFormsForCurrentUser();
            });
        }

        function selectForm(index) {
            console.log("FormController selectForm");
            var editForm = {
                "_id": $scope.forms[index]["_id"],
                "userId": $scope.forms[index]["userId"],
                "title": $scope.forms[index]["title"]
            };
            $scope.form = editForm;
            $scope.selected = index;
        }

        function updateFormsForCurrentUser() {
            console.log("FormController updateFormsForCurrentUser");
            FormService.findAllFormsForUser(userId, function (formsByUserId) {
                $scope.forms = formsByUserId;
            });
        }
    }
})();