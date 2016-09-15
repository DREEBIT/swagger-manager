'use strict';

/**
 * @ngdoc function
 * @name amApp.controller:DefinitionListCtrl
 * @description
 * # DefinitionListCtrl
 * Controller of the amApp
 */
angular.module('amApp')
    .controller('DefinitionListCtrl', function ($scope, $state, $mdDialog, Definition, Property, Notification) {

        $scope.toolbarOptions = {
            title: 'Definitions'
        };
        $scope.showSearch = false;
        $scope.search = {};
        $scope.searchIcon = 'search';
        $scope.list = [];

        $scope.toggleSearchBar = function(){
            $scope.showSearch = !$scope.showSearch;
            $scope.search.title = '';
            $scope.showSearch ? $scope.searchIcon = 'clear' : $scope.searchIcon = 'search';
        };

        $scope.init = function(){
            $scope.getDefinitions();
        };

        $scope.getDefinitions = function(){
            Definition.getList({ sort: 'title ASC' }).then(function(data){
                $scope.list = data;
            });
        };

        $scope.navigateTo = function(state, params){
            $state.go(state, {id: params.id, definition: params.definition});
        };

        $scope.add = function (ev) {
            $mdDialog.show({
                    controller: 'DefinitionAddCtrl',
                    templateUrl: 'views/definition/add.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                }).then(function(res){
                    $scope.list.push(res.definition);
                    $state.go('definition.tab',{id:res.definition.id, definition: res.definition});
                });
        };

        $scope.delete = function () {
            var confirm = $mdDialog.confirm()
                .title('Delete selected Definitions?')
                .clickOutsideToClose(true)
                .ok('Delete!')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function () {

                $scope.list.forEach(function(value){
                    if(value.selected === true){
                        value.remove().then(function (data) {
                                Notification.success('Definition ' + data.title + ' removed');
                                $scope.list.splice($scope.list.indexOf(value), 1);
                            },
                            function(err){
                                Notification.error('Something went wrong!');
                            }
                        );
                    }
                });
                $state.go('definition');
            });
        };
    });

