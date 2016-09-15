'use strict';

/**
 * @ngdoc function
 * @name amApp.controller:ResponsesTableCtrl
 * @description
 * # ResponsesTableCtrl
 * Controller of the amApp
 */
angular.module('amApp')
    .controller('ResponsesTableCtrl', function ($scope, $q, $timeout, $state, Restangular, $mdDialog, $sce, Notification, Response, Method,
                                                FormatService, method) {

        $scope.method = method;
        $scope.selected = [];
        $scope.query = {
            order: 'index'
        };

        $scope.onorderchange = function (order) {
            var deferred = $q.defer();

            $timeout(function () {
                deferred.resolve();
            }, 500);

            return deferred.promise;
        };

        $scope.updateParentMethod = function(){
            $scope.$parent.method.responses = $scope.method.responses;
        };

        $scope.add = function (event, createAnother) {
            $mdDialog.show({
                    controller: 'ResponseDetailCtrl',
                    templateUrl: 'views/response/add.html',
                    parent: angular.element(document.body),
                    targetEvent: event,
                    clickOutsideToClose: true,
                    locals: {
                        method: $scope.method,
                        response: {},
                        createAnother: createAnother
                    }
                }).then(function (res) {
                    $scope.method.responses.push(res.response);
                    $scope.updateParentMethod();

                    if (res.createAnother) {
                        $scope.add(null, true);
                    }
                });
        };

        $scope.edit = function (event, response) {
            $mdDialog.show({
                    controller: 'ResponseDetailCtrl',
                    templateUrl: 'views/response/edit.html',
                    parent: angular.element(document.body),
                    targetEvent: event,
                    clickOutsideToClose: true,
                    locals: {
                        method: $scope.method,
                        response: response,
                        createAnother: false
                    }
                }).then(function (res) {
                    $scope.method.responses[$scope.method.responses.indexOf(response)] = res.response;
                    $scope.updateParentMethod();
                });
        };

        $scope.deleteResponseFromScopeMethod = function(responseToDelete){
            for(var i = 0; i < $scope.method.responses.length; i++) {
                if($scope.method.responses[i].id == responseToDelete.id) {
                    $scope.method.responses.splice(i, 1);
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

            $mdDialog.show(confirm).then(function () {
                selected.forEach(function (response) {
                    var toDelete = Restangular.one("responses", response.id);
                    toDelete.remove().then(function(data){
                        selected.splice(selected.indexOf(response));
                        Notification.success('Response ' + data.index + ' removed');
                    });
                    $scope.deleteResponseFromScopeMethod(response);
                })
            });
        };

        $scope.getFormatString = function (parameter) {
            return $sce.trustAsHtml(FormatService.getPropertyFormatForTable(parameter));
        };
    });
