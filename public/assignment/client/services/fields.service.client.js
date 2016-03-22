/**
 * Created by Aditya on 3/17/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http) {
        var api = {
            findAllFieldsByFormId: findAllFieldsByFormId,
            findFieldIdFormId: findFieldIdFormId,
            deleteFieldIdFormId: deleteFieldIdFormId,
            createFieldByFormId: createFieldByFormId,
            updateFieldIdFormId: updateFieldIdFormId,
            sortFields: sortFields
        }

        return api;

        function findAllFieldsByFormId(formId) {
            return $http.get("/api/assignment/form/" + formId + "/field");
        }

        function findFieldIdFormId(formId, fieldId) {
            return $http.get("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function deleteFieldIdFormId(formId, fieldId) {
            return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function createFieldByFormId(formId, field) {
            return $http.post("/api/assignment/form/" + formId + "/field", field);
        }

        function updateFieldIdFormId(formId, fieldId, field) {
            return $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field);
        }

        function sortFields(formId, start, end) {
            return $http.put("/api/assignment/form/" + formId + "/field/" + start + "/" + end);
        }
    }
})();