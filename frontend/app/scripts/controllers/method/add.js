'use strict';

/**
 * @ngdoc function
 * @name amApp.controller:PathAddmethodCtrl
 * @description
 * # PathAddmethodCtrl
 * Controller of the amApp
 */
angular.module('amApp')
    .controller('MethodAddCtrl', function ($scope, $mdDialog, Method, Path, path) {

        $scope.method = {
            path: path.id,
            testActive: true
        };

        $scope.add = function() {
            Method.post($scope.method).then(function(method){
                $mdDialog.hide(method);
            });
        };

        $scope.cancel = function() {
            $mdDialog.cancel('cancel');
        };

        $scope.formFields = [
            {
                key: 'name',
                type: 'select',
                templateOptions: {
                    label: 'Method',
                    valueProp: 'name',
                    labelProp: 'name',
                    options: [{'name': 'GET'},{'name': 'POST'},{'name': 'PUT'},{'name': 'DELETE'}],
                    required: true
                }
            },{
                key: 'testActive',
                type: 'checkbox',
                templateOptions: {
                    label: 'Test Automation'
                }
            }
        ];
    });
