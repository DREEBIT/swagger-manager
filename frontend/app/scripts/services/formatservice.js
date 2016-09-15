'use strict';

/**
 * @ngdoc service
 * @name amApp.FormatService
 * @description
 * # FormatService
 * Service in the amApp.
 */
angular.module('amApp')
    .service('FormatService', function () {

        this.getPropertyFormatForSample = function (property) {
            var output = '{{type}}';

            if (property.isArray) {
                output = output.replace('{{type}}', '[ {{type}} ]');
            }
            if (property.type === '$ref') {
                output = output.replace('{{type}}', '<a href="#/definitions/' + property.$ref.id + '">' + property.$ref.title + '</a>');
            } else {
                output = output.replace('{{type}}', property.type);
            }

            return output;
        };

        this.getPropertyFormatForTable = function (property) {
            var output = '{{type}}';

            if (property.isArray) {
                output = output.replace('{{type}}', '[ {{type}} ]');
            }
            if (property.type === '$ref') {
                output = output.replace('{{type}}', '<a href="#/definitions/' + property.$ref.id + '/details">' + property.$ref.title + '</a>');
            } else {
                output = output.replace('{{type}}', property.type + '{{format}}');
                if (property.format) {
                    output = output.replace('{{format}}', ' (' + property.format + ')');
                } else if (property.default === false || property.default === true) {
                    output = output.replace('{{format}}', ' (' + property.default + ')');
                } else {
                    output = output.replace('{{format}}', '');
                }
            }

            return output;
        };

    });
