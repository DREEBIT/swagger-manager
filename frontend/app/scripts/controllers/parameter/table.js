'use strict';

/**
 * @ngdoc function
 * @name amApp.controller:ParametersTableCtrl
 * @description
 * # ParametersTableCtrl
 * Controller of the amApp
 */
angular.module('amApp')
    .controller('ParametersTableCtrl', function ($scope, $q, $timeout, $state, Restangular, $mdDialog, $sce, Notification, Parameter,
                                                 Method, FormatService, method) {

        $scope.method = method;
        $scope.selected = [];
        $scope.query = {
            order: 'name'
        };

        $scope.onorderchange = function (order) {
            var deferred = $q.defer();

            $timeout(function () {
                deferred.resolve();
            }, 500);

            return deferred.promise;
        };

        $scope.updateParentMethod = function(){
            $scope.$parent.method.parameters = $scope.method.parameters;
        };

        $scope.add = function (event, createAnother) {
            $mdDialog.show({
                    controller: 'ParameterDetailCtrl',
                    templateUrl: 'views/parameter/add.html',
                    parent: angular.element(document.body),
                    targetEvent: event,
                    clickOutsideToClose: true,
                    locals: {
                        method: $scope.method,
                        parameter: {},
                        createAnother: createAnother
                    }
                })
                .then(function (res) {

                    $scope.method.parameters.push(res.parameter);
                    $scope.updateParentMethod();

                    if (res.createAnother) {
                        $scope.add(null, true);
                    }
                });
        };

        $scope.edit = function (event, parameter) {
            $mdDialog.show({
                    controller: 'ParameterDetailCtrl',
                    templateUrl: 'views/parameter/edit.html',
                    parent: angular.element(document.body),
                    targetEvent: event,
                    clickOutsideToClose: true,
                    locals: {
                        method: $scope.method,
                        parameter: parameter,
                        createAnother: false
                    }
                }).then(function (res) {
                    $scope.method.parameters[$scope.method.parameters.indexOf(parameter)] = res.parameter;
                    $scope.updateParentMethod();
                });
        };

        $scope.deleteParameterFromScopeMethod = function(parameterToDelete){
            for(var i = 0; i < $scope.method.parameters.length; i++) {
                if($scope.method.parameters[i].id == parameterToDelete.id) {
                    $scope.method.parameters.splice(i, 1);
                    break;
                }
            }
        };

        $scope.delete = function (selected) {
            var confirm = $mdDialog.confirm()
                .title('Delete selected Parameters?')
                .clickOutsideToClose(true)
                .ok('Delete!')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function() {
                selected.forEach(function (parameter) {
                    var toDelete = Restangular.one("parameters", parameter.id);
                    toDelete.remove().then(function(data){
                        selected.splice(selected.indexOf(parameter));
                        Notification.success('Parameter ' + data.name + ' removed');
                    });
                    $scope.deleteParameterFromScopeMethod(parameter);
                })
            });
        };

        $scope.getFormatString = function (parameter) {
            return $sce.trustAsHtml(FormatService.getPropertyFormatForTable(parameter));
        };

    });
