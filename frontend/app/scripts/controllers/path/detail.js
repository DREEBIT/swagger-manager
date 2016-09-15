'use strict';

/**
 * @ngdoc function
 * @name amApp.controller:PathDetailCtrl
 * @description
 * # PathDetailCtrl
 * Controller of the amApp
 */
angular.module('amApp')
    .controller('PathDetailCtrl', function ($scope, Notification, $mdDialog, $state, path) {

        $scope.path = path;

        $scope.save = function(path) {
            delete path.methods;
            path.put().then(function(data){
                Notification.success('Path ' + path.title + ' updated');
                $scope.$parent
                $scope.path = data;
            },
            function(err){
                Notification.error('Error while updating path!');
            });
        };

        $scope.formFields = [
            {
                key: 'title',
                type: 'input',
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
