'use strict';

/**
 * @ngdoc function
 * @name amApp.controller:ParameterDetailCtrl
 * @description
 * # ParameterDetailCtrl
 * Controller of the amApp
 */
angular.module('amApp')
    .controller('ParameterDetailCtrl', function ($scope, $mdDialog, Notification, Definition, Parameter, method, parameter,
                                                 createAnother) {

        $scope.method = method;
        $scope.parameter = parameter;

        if (parameter.id) {
            Parameter.one(parameter.id).get().then(function (data) {
                $scope.parameter = data;
            });
        } else {
            $scope.parameter = {method: method};
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

        $scope.add = function (parameter) {
            Parameter.post(parameter).then(function (data) {
                if(data.type === '$ref') {
                    Definition.one(data.$ref).get().then(function (def) {
                        data.$ref = def;
                    });
                }
                $mdDialog.hide({parameter: data, createAnother: $scope.createAnother});
                Notification.success('Parameter ' + data.name + ' added');
            });
        };

        $scope.save = function (parameter) {

            delete parameter.method;

            if(parameter.format === '') parameter.format = null;
            if(parameter.type === '') parameter.type = null;
            if(parameter.default === '') parameter.default = null;

            parameter.save().then(function (data) {
                $mdDialog.hide({parameter: data});
                Notification.success('Parameter ' + data.name + ' saved');
            });
        };

        $scope.cancel = function () {
            $mdDialog.cancel('cancel');
        };

        $scope.formFields = [
            {
                key: 'name',
                type: 'input-focus',
                templateOptions: {
                    label: 'Name',
                    required: true,
                    focus: true
                }
            },
            {
                key: 'in',
                type: 'select',
                templateOptions: {
                    label: 'In',
                    valueProp: 'name',
                    labelProp: 'name',
                    options: [{'name': 'header'}, {'name': 'path'}, {'name': 'query'}, {'name': 'body'}, {'name': 'formData'}],
                    required: true
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
                hideExpression: 'model.type != "$ref"'
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
                hideExpression: 'model.type != "integer"'
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
                hideExpression: 'model.type != "number"'
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
                hideExpression: 'model.type != "string"'
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
