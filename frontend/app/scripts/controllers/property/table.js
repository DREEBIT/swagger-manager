'use strict';

/**
 * @ngdoc function
 * @name amApp.controller:PropertyCtrl
 * @description
 * # PropertyCtrl
 * Controller of the amApp
 */
angular.module('amApp')
    .controller('PropertyTableCtrl', function ($q, $scope, $timeout, $mdDialog, Restangular, $sce, FormatService, Definition, Property,
                                               Notification, definition) {

        $scope.definition = definition;
        $scope.selected = [];
        $scope.query = {
            order: 'key'
        };

        $scope.onorderchange = function () {
            var deferred = $q.defer();

            $timeout(function () {
                deferred.resolve();
            }, 500);

            return deferred.promise;
        };

        $scope.updateParentDefinition = function(){
            $scope.$parent.definition.properties = $scope.definition.properties;
        };

        $scope.add = function (ev, createAnother) {
            $mdDialog.show({
                    controller: 'PropertyDetailCtrl',
                    templateUrl: 'views/property/add.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    locals: {
                        definition: $scope.definition,
                        property: {},
                        createAnother: createAnother
                    }
                })
                .then(function (res) {

                    $scope.definition.properties.push(res.property);
                    $scope.updateParentDefinition();

                    if (res.createAnother) {
                        $scope.add(null, true);
                    }
                });
        };

        $scope.edit = function (event, property) {
            $mdDialog.show({
                    controller: 'PropertyDetailCtrl',
                    templateUrl: 'views/property/edit.html',
                    parent: angular.element(document.body),
                    targetEvent: event,
                    clickOutsideToClose: true,
                    locals: {
                        definition: $scope.definition,
                        property: property,
                        createAnother: false
                    }
                })
                .then(function (res) {
                    $scope.definition.properties[$scope.definition.properties.indexOf(property)] = res.property;
                    $scope.updateParentDefinition();
                });
        };

        $scope.deletePropertyFromScopeDefinition = function(propertyToDelete){
            for(var i = 0; i < $scope.definition.properties.length; i++) {
                if($scope.definition.properties[i].id == propertyToDelete.id) {
                    $scope.definition.properties.splice(i, 1);
                    break;
                }
            }
        };

        $scope.delete = function (selected) {
            var confirm = $mdDialog.confirm()
                .title('Delete selected Properties?')
                .clickOutsideToClose(true)
                .ok('Delete!')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function() {
                selected.forEach(function (property) {
                    var toDelete = Restangular.one("properties", property.id);
                    toDelete.remove().then(function(data){
                        selected.splice(selected.indexOf(property));
                        Notification.success('Property ' + data.key + ' removed');
                    });
                    $scope.deletePropertyFromScopeDefinition(property);
                })
            });
        };

        $scope.getFormatString = function (property) {
            return $sce.trustAsHtml(FormatService.getPropertyFormatForTable(property));
        };
    });

