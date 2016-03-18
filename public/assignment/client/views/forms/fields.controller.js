(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($routeParams, FormService, FieldService) {
        var model = this;
        model.addField = addField;
        model.removeField = removeField;
        model.cloneField = cloneField;

        var fieldTypesDefault = [
            {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"},
            {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"},
            {"_id": null, "label": "New Date Field", "type": "DATE"},
            {
                "_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                {"label": "Option 1", "value": "OPTION_1"},
                {"label": "Option 2", "value": "OPTION_2"},
                {"label": "Option 3", "value": "OPTION_3"}
            ]
            },
            {
                "_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                {"label": "Option A", "value": "OPTION_A"},
                {"label": "Option B", "value": "OPTION_B"},
                {"label": "Option C", "value": "OPTION_C"}
            ]
            },
            {
                "_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                {"label": "Option X", "value": "OPTION_X"},
                {"label": "Option Y", "value": "OPTION_Y"},
                {"label": "Option Z", "value": "OPTION_Z"}
            ]
            }
        ];

        function init() {
            model.fieldTypes = ["Single Line Text Field", "Multi Line Text Field", "Date Field", "Dropdown Field", "Checkboxes Field", "Radio Buttons Field"];
            model.fieldType = -1;
            model.formId = $routeParams.formId;

            FormService
                .findFormById(model.formId)
                .then(function (response) {
                    var form = response.data;
                    if (form) {
                        model.formTitle = form.title;
                    }
                });

            FieldService
                .findAllFieldsByFormId(model.formId)
                .then(function (response) {
                    var fields = response.data;
                    if (fields) {
                        model.fields = fields;
                        console.log(model.fields);
                    }
                });
        }

        init();

        function addField(fieldType) {
            if (fieldType == -1) {
                alert("Please select a value for Add New Field");
                return;
            }
            var field = fieldTypesDefault[fieldType];
            FieldService
                .createFieldByFormId(model.formId, field)
                .then(function (response) {
                    if (response.data) {
                        model.fields = response.data;
                        console.log("fields in this form: " + JSON.stringify(model.fields));
                        fieldType = -1;
                    }
                });
        }

        function removeField(fieldId) {
            FieldService
                .deleteFieldIdFormId($routeParams.formId, fieldId)
                .then(function (response) {
                    if (response.data) {
                        model.fields = response.data;
                    }
                });
        }

        function cloneField(field) {
            FieldService
                .createFieldByFormId(model.formId, field)
                .then(function (response) {
                    if (response.data) {
                        model.fields = response.data;
                    }
                });
        }
    }
})();