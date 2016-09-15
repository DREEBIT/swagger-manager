'use strict';

/**
 * @ngdoc function
 * @name amApp.controller:PathTabsCtrl
 * @description
 * # PathTabsCtrl
 * Controller of the amApp
 */
angular.module('amApp')
    .controller('PathTabsCtrl', function ($scope, path, method) {

        $scope.path = path;
        $scope.method = method;

        $scope.tabData   = [
            {
                heading: 'Details',
                route:   'path.tab.detail'
            },
            {
                heading: 'Parameters',
                route:   'path.tab.parameters'
            },
            {
                heading: 'Responses',
                route:   'path.tab.responses'
            }
        ];
    });
