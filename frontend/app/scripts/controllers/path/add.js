'use strict';

/**
 * @ngdoc function
 * @name amApp.controller:PathAddmodalCtrl
 * @description
 * # PathAddmodalCtrl
 * Controller of the amApp
 */
angular.module('amApp')
    .controller('PathAddCtrl', function ($scope, $mdDialog, Path) {

        $scope.add = function(path){
            Path.post(path).then(function(data){
                $mdDialog.hide(data);
            });
        };

        $scope.cancel = function () {
            $mdDialog.cancel('cancel');
        };

        $scope.formFields = [
            {
                key: 'title',
                type: 'input-focus',
                templateOptions: {
                    label: 'Title',
                    required: true,
                    focus: true
                }
            },
            {
                key: 'description',
                type: 'input',
                templateOptions: {
                    label: 'Description'
                }
            }
        ];
    });
