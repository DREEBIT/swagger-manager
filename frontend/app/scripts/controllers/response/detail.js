'use strict';

/**
 * @ngdoc function
 * @name amApp.controller:ResponseDetailCtrl
 * @description
 * # ResponseDetailCtrl
 * Controller of the amApp
 */
angular.module('amApp')
    .controller('ResponseDetailCtrl', function ($scope, $mdDialog, Notification, Definition, Response, method, response,
                                                createAnother) {

        $scope.response = response;

        if (response.id) {
            Response.one(response.id).get().then(function (data) {
                $scope.response = data;
            });
        } else {
            $scope.response = { method: method };
        }

        $scope.createAnother = createAnother;

        $scope.getDefinitionList = function () {
            var result = [];
            Definition.getList({sort: 'title ASC'}).then(function (data) {
                data.forEach(function (obj) {
                    result.push(obj);
                });
            });
            return result;
        };

        $scope.add = function (response) {
            Response.post(response).then(function (data) {
                if(data.type === '$ref') {
                    Definition.one(data.$ref).get().then(function (def) {
                        data.$ref = def;
                    });
                }
                $mdDialog.hide({response: data, createAnother: $scope.createAnother});
                Notification.success('Response ' + data.index + ' added');
            });
        };

        $scope.save = function (response) {

            delete response.method;

            if(response.format === '') response.format = null;
            if(response.type !== '$ref') response.$ref = null;
            if(response.type === '') response.type = null;
            if(response.default === '') response.default = null;

            response.save().then(function (data) {
                $mdDialog.hide({response: data});
                Notification.success('Response ' + data.index + ' saved');
            });
        };

        $scope.cancel = function () {
            $mdDialog.cancel('cancel');
        };

        $scope.formFields = [
            {
                key: 'index',
                type: 'select',
                templateOptions: {
                    label: 'Statuscode',
                    valueProp: 'name',
                    labelProp: 'name',
                    options: [{'name': 'default'}, {'name': '200'}, {'name': '201'}, {'name': '400'}, {'name': '401'}],
                    required: true
                }
            },
            {
                key: 'description',
                type: 'input',
                templateOptions: {
                    label: 'Description'
                }
            },
            {
                key: 'type',
                type: 'select',
                templateOptions: {
                    label: 'Type',
                    valueProp: 'name',
                    labelProp: 'name',
                    options: [{'name': 'string'}, {'name': 'integer'}, {'name': 'boolean'}, {'name': '$ref'}],
                    required: true
                }
            },
            {
                key: '$ref',
                type: 'select',
                templateOptions: {
                    label: '$ref',
                    valueProp: 'id',
                    labelProp: 'title',
                    options: $scope.getDefinitionList()
                },
                hideExpression: 'model.type !== "$ref"'
            },
            {
                key: 'format',
                type: 'select',
                templateOptions: {
                    label: 'Format',
                    valueProp: 'name',
                    labelProp: 'name',
                    options: [{'name': 'int32'}, {'name': 'int64'}]
                },
                hideExpression: 'model.type !== "integer"'
            },
            {
                key: 'format',
                type: 'select',
                templateOptions: {
                    label: 'Format',
                    valueProp: 'name',
                    labelProp: 'name',
                    options: [{'name': 'float'}, {'name': 'double'}]
                },
                hideExpression: 'model.type !== "number"'
            },
            {
                key: 'format',
                type: 'select',
                templateOptions: {
                    label: 'Format',
                    valueProp: 'name',
                    labelProp: 'name',
                    options: [{'name': 'byte'}, {'name': 'date'}, {'name': 'date-time'}, {'name': 'password'}]
                },
                hideExpression: 'model.type !== "string"'
            },
            {
                key: 'default',
                type: 'select',
                templateOptions: {
                    label: 'Default',
                    valueProp: 'name',
                    labelProp: 'name',
                    options: [{'name': true}, {'name': false}]
                },
                hideExpression: 'model.type != "boolean"'
            },
            {
                key: 'isArray',
                type: 'checkbox',
                templateOptions: {
                    label: 'Is Array'
                }
            }
        ];
    });
