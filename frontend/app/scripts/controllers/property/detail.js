'use strict';

/**
 * @ngdoc function
 * @name amApp.controller:PropertyDetailCtrl
 * @description
 * # PropertyDetailCtrl
 * Controller of the amApp
 */
angular.module('amApp')
    .controller('PropertyDetailCtrl', function ($scope, $mdDialog, Notification, Definition, Property, definition, property,
                                                createAnother) {

        $scope.property = property;
        $scope.createAnother = createAnother;

        if (property.id) {
            Property.one(property.id).get().then(function (data) {
                $scope.property = data;
            });
        } else {
            $scope.property = { definition: definition }
        }

        $scope.getDefinitionList = function () {
            var result = [];
            Definition.getList({sort: 'title ASC'}).then(function (data) {
                data.forEach(function (obj) {
                    result.push(obj);
                });
            });
            return result;
        };

        $scope.add = function (property) {
            Property.post(property).then(function (data) {
                if(data.type === '$ref') {
                    Definition.one(data.$ref).get().then(function (def) {
                        data.$ref = def;
                    });
                }
                $mdDialog.hide({property: data, createAnother: $scope.createAnother});
                Notification.success('Property ' + data.key + ' added');
            });
        };

        $scope.save = function (property) {
            delete property.definition;

            if(property.format === '') property.format = null;
            if(property.type === '') property.type = null;
            if(property.default === '') property.default = null;

            property.save().then(function (data) {
                $mdDialog.hide({property: data});
                Notification.success('Property ' + data.key + ' saved');
            });
        };

        $scope.clearValue = function(value){
            value = null;
        };

        $scope.cancel = function () {
            $mdDialog.cancel('cancel');
        };

        $scope.formFields = [
            {
                key: 'key',
                type: 'input-focus',
                templateOptions: {
                    label: 'Key',
                    required: true,
                    focus: true
                }
            },
            {
                key: 'type',
                type: 'select',
                templateOptions: {
                    label: 'Type',
                    valueProp: 'name',
                    labelProp: 'name',
                    options: [{'name': ''}, {'name': 'string'}, {'name': 'integer'}, {'name': 'boolean'}, {'name': '$ref'}],
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
                    options: $scope.getDefinitionList(),
                    required: true
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
                    options: [{'name': ''}, {'name': 'int32'}, {'name': 'int64'}]
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
                    options: [{'name': ''}, {'name': 'float'}, {'name': 'double'}]
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
                    options: [{'name': ''}, {'name': 'byte'}, {'name': 'date'}, {'name': 'date-time'}, {'name': 'password'}]
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
                    options: [{'name': ''}, {'name': true}, {'name': false}]
                },
                hideExpression: 'model.type != "boolean"'
            },
            {
                key: 'isArray',
                type: 'checkbox',
                templateOptions: {
                    label: 'Is Array'
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
                key: 'required',
                type: 'checkbox',
                templateOptions: {
                    label: 'Required'
                }
            }
        ];
    });
