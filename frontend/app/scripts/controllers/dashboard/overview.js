/**
 * Created by SchmidtMa on 09.12.2015.
 */
'use strict';

/**
 * @ngdoc function
 * @name amApp.controller:DashboardOverviewCtrl
 * @description
 * # DashboardOverviewCtrl
 * Controller of the amApp
 */
angular.module('amApp')
    .controller('DashboardOverviewCtrl', function ($scope, $state, $timeout, $log, $uibModal, Tag, Definition, Path, Method) {

        $scope.$state = $state;
        $scope.toolbarOptions = {
            title: 'Dashboard'
        };
        $scope.tags = [];
        $scope.definitions = [];
        $scope.paths = [];
        $scope.methods = [];
        $scope.all = [];
        $scope.lastChanges = [];

        $scope.init = function(){

            Tag.getList({ sort: 'updatedAt DESC' }).then(function(data){
                $scope.tags = data;
                $scope.tags.total = data.length;
                data.forEach(function(entry){
                    $scope.all.push(entry);
                });

                Definition.getList({ sort: 'updatedAt DESC' }).then(function(data){
                    $scope.definitions = data;
                    $scope.definitions.total = data.length;
                    data.forEach(function(entry){
                        $scope.all.push(entry);
                    });

                    Path.getList({ sort: 'updatedAt DESC' }).then(function(data){
                        $scope.paths = data;
                        $scope.paths.total = data.length;
                        data.forEach(function(entry){
                            $scope.all.push(entry);
                        });

                        Method.getList({ sort: 'updatedAt DESC' }).then(function(data){
                            $scope.methods = data;
                            $scope.methods.total = data.length;
                            data.forEach(function(entry){
                                $scope.all.push(entry);
                            });
                            $scope.all.sort($scope.sortBy('-updatedAt'));
                            $scope.lastChanges = $scope.all.slice(0,5);

                        });
                    });
                });
            });
        };

        $scope.sortBy = function (property) {
            var sortOrder = 1;
            if(property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }
            return function (a,b) {
                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            }
        }
    });
