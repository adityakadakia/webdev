/**
 * Created by Aditya on 3/18/2016.
 */
"use strict";
(function () {
    angular
        .module("sortable", [])
        .directive("sortable", sortable);

    function sortable(FieldService) {
        var start = null;
        var end = null;

        function link(scope, element, attributes) {
            var axis = attributes.axis;
            $(element).sortable({
                axis: axis,
                handle: '.handle',
                start: function (event, ui) {
                    start = ui.item.index();
                },
                stop: function (event, ui) {
                    end = ui.item.index();
                    scope.model.fields.splice(end, 0,
                        scope.model.fields.splice(start, 1)[0]);
                    FieldService
                        .sortFields(scope.model.formId, start, end)
                        .then(function (response) {
                            var fields = response.data;
                            if (fields) {
                                scope.model.fields = fields;
                            }
                        });
                }
            });
        }

        return {
            link: link
        }
    }
})();