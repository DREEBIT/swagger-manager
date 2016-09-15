'use strict';

/**
 * @ngdoc function
 * @name amApp.controller:DefinitionTabsCtrl
 * @description
 * # DefinitionTabsCtrl
 * Controller of the amApp
 */
angular.module('amApp')
    .controller('DefinitionTabsCtrl', function ($scope, Definition, definition) {

        $scope.definition = definition;

        $scope.definition.properties.forEach(function(property, index){
            if(property.$ref !== null && typeof property.$ref !== 'object'){
                Definition.one(property.$ref).get().then(function(data){
                    $scope.definition.properties[index].$ref = data;
                });
            }
        });

        $scope.tabData   = [
            {
                heading: 'Details',
                route: 'definition.tab.detail'
            },
            {
                heading: 'Properties',
                route: 'definition.tab.properties'
            },
            {
                heading: 'Sample',
                route: 'definition.tab.sample'
            },
            {
                heading: 'Resources',
                route: 'definition.tab.resources'
            }
        ];
    });
