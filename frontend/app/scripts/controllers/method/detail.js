'use strict';

/**
 * @ngdoc function
 * @name amApp.controller:PathDetailCtrl
 * @description
 * # PathDetailCtrl
 * Controller of the amApp
 */
angular.module('amApp')
    .controller('MethodDetailCtrl', function ($scope, Restangular, Method, Tag, Notification, path, method) {

        $scope.method = method;
        $scope.path = path;

        $scope.getTags = function () {
            var result = [];

            Tag.getList({sort: 'name ASC'}).then(function (data) {

                data.forEach(function (item) {
                    if ($scope.method.tags[0]) {
                        $scope.method.tags.forEach(function (tag) {
                            if (tag.id != item.id) {
                                result.push({
                                    'id': item.id,
                                    'name': item.name
                                });
                            }
                        });
                    } else {
                        result.push({
                            'id': item.id,
                            'name': item.name
                        });
                    }
                });
            });
            return result;
        };

        $scope.save = function (method) {
            var toSave = Restangular.copy(method);
            delete toSave.parameters;
            delete toSave.responses;

            toSave.path = method.path.id;
            toSave.save().then(function () {
                Notification.success('Method ' + toSave.name + ' updated');
            });
        };

        $scope.formFields = [
            {
                key: 'name',
                type: 'select',
                templateOptions: {
                    label: 'Method',
                    valueProp: 'name',
                    labelProp: 'name',
                    options: [{'name': 'GET'}, {'name': 'POST'}, {'name': 'PUT'}, {'name': 'DELETE'}],
                    required: true
                }
            },{
                key: 'tags',
                type: 'ui-select-multiple',
                templateOptions: {
                    optionsAttr: 'bs-options',
                    ngOptions: 'option[to.valueProp] as option in to.options | filter: $select.search',
                    label: 'Tags',
                    valueProp: 'id',
                    labelProp: 'name',
                    options: $scope.getTags()
                }
            },
            {
                key: 'description',
                type: 'textarea',
                templateOptions: {
                    label: 'Description'
                }
            },
            {
                key: 'summary',
                type: 'input',
                templateOptions: {
                    label: 'Summary'
                }
            },
            {
                key: 'operationId',
                type: 'input',
                templateOptions: {
                    label: 'OperationId'
                }
            },
            {
                key: 'consumes',
                type: 'ui-select-multiple',
                templateOptions: {
                    optionsAttr: 'bs-options',
                    ngOptions: 'option[to.valueProp] as option in to.options | filter: $select.search',
                    label: 'Consumes',
                    valueProp: 'consumes',
                    labelProp: 'consumes',
                    options: [{'consumes': 'application/xml'}, {'consumes': 'application/json'}]
                }
            },
            {
                key: 'produces',
                type: 'ui-select-multiple',
                templateOptions: {
                    optionsAttr: 'bs-options',
                    ngOptions: 'option[to.valueProp] as option in to.options | filter: $select.search',
                    label: 'Produces',
                    valueProp: 'produces',
                    labelProp: 'produces',
                    options: [{'produces': 'application/xml'}, {'produces': 'application/json'}]
                }
            }
        ];
    });
