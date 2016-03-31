"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($routeParams, FormService, FieldService) {
        var model = this;
        model.addField = addField;
        model.removeField = removeField;
        model.cloneField = cloneField;
        model.editFields = editFields;
        model.updateField = updateField;
        model.reset = reset;

        var fieldTypesDefault = [
            {"label": "New Text Field", "type": "TEXT", "placeholder": "New Field"},
            {"label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"},
            {"label": "New Date Field", "type": "DATE"},
            {
                "label": "New Dropdown", "type": "OPTIONS", "options": [
                {"label": "Option 1", "value": "OPTION_1"},
                {"label": "Option 2", "value": "OPTION_2"},
                {"label": "Option 3", "value": "OPTION_3"}
            ]
            },
            {
                "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                {"label": "Option A", "value": "OPTION_A"},
                {"label": "Option B", "value": "OPTION_B"},
                {"label": "Option C", "value": "OPTION_C"}
            ]
            },
            {
                "label": "New Radio Buttons", "type": "RADIOS", "options": [
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

        function editFields(field) {
            console.log("editField");
            model.editField = JSON.parse(JSON.stringify(field));
            model.editFieldType = model.fieldTypes[getFieldIndex(model.editField.type)];
            model.options = toStringArray(model.editField.options);
            if (model.editField.options)
                model.rows = model.editField.options.length;
        }

        function toStringArray(options) {
            var stringArray = [];
            for (var index in options)
                stringArray.push(options[index].label + ":" + options[index].value);
            return stringArray;
        }

        function getFieldIndex(fieldType) {
            var index = 0;
            for (var i = 0; i < fieldTypesDefault.length; i++) {
                if (fieldTypesDefault[i].type === fieldType) {
                    return index;
                }
                index++;
            }
        }

        function updateField(field) {
            if (model.options.length > 0) {
                var jsonArray = getJSON(model.options);
                field.options = jsonArray;

            }

            FieldService
                .updateFieldIdFormId(model.formId, field._id, field)
                .then(function (response) {
                    if (response.data) {
                        model.fields = response.data;
                    }
                });
        }

        function getJSON(stringArray) {
            var options = [];
            for (var index in stringArray) {
                if (stringArray[index].indexOf(':') > -1) {
                    var pairs = stringArray[index].split(':');
                    options.push({"label": pairs[0], "value": pairs[1]});
                }
            }
            console.log(options);
            return options;
        }

        function reset() {
            console.log("reset editField");
            model.editField = null;
            model.editFieldType = null;
        }
    }
})();