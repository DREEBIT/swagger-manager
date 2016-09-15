'use strict';

/**
 * @ngdoc function
 * @name amApp.controller:DefinitionAddCtrl
 * @description
 * # DefinitionAddCtrl
 * Controller of the amApp
 */
angular.module('amApp')
    .controller('DefinitionAddCtrl', function ($scope, $mdDialog, Definition, Notification) {

        $scope.add = function(definition){
            Definition.post(definition).then(function(data){
                data.properties = [];
                $mdDialog.hide({definition: data});
                Notification.success('Definition ' + data.title + ' added');
            },function(err){

                if (err !== null) {
                    Notification.error('' + err);
                } else {
                    Notification.error('Something went wrong');
                }
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
                type: 'textarea',
                templateOptions: {
                    label: 'Description'
                }
            }
        ];
    });

