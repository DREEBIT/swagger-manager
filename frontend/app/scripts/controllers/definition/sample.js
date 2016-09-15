'use strict';

/**
 * @ngdoc function
 * @name amApp.controller:DefinitionSampleCtrl
 * @description
 * # DefinitionSampleCtrl
 * Controller of the amApp
 */
angular.module('amApp')
    .controller('DefinitionSampleCtrl', function ($scope, $sce, definition, FormatService) {

        $scope.definition = definition;

        $scope.getSampleString = function (property) {
            return $sce.trustAsHtml(FormatService.getPropertyFormatForSample(property));
        };
    });
