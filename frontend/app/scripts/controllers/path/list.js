'use strict';

/**
 * @ngdoc function
 * @name amApp.controller:PathListCtrl
 * @description
 * # PathListCtrl
 * Controller of the amApp
 */
angular.module('amApp')
    .controller('PathListCtrl', function ($scope, $state, $mdDialog, Notification, Restangular, Method, Path) {

        $scope.toolbarOptions = {
            title: 'Paths'
        };
        $scope.showSearch = false;
        $scope.search = {};
        $scope.searchIcon = 'search';
        $scope.focused = false;
        $scope.expanded = false;
        $scope.allExpanded = false;
        $scope.expandIcon = 'expand_more';
        $scope.list = [];

        $scope.toggleSearchBar = function(){
            $scope.showSearch = !$scope.showSearch;
            $scope.search.title = '';
            $scope.showSearch ? $scope.searchIcon = 'clear' : $scope.searchIcon = 'search';
        };

        $scope.toggleAllExpanded = function(){
            $scope.allExpanded = !$scope.allExpanded;

            console.log($scope.allExpanded);

            if($scope.allExpanded){
                $scope.expandIcon = 'expand_less';
                $scope.accordion.expandAll();
            }else{
                $scope.expandIcon = 'expand_more';
                $scope.accordion.collapseAll();
            }
        };

        $scope.init = function(){
            $scope.getPaths();
        };

        $scope.getPaths = function(){
            Path.getList({ sort: 'title ASC' }).then(function(data){
                $scope.list = data;
                console.log($scope.list);
            });
        };

        $scope.navigateToPathDetails = function(state, path){
            $state.go(state, {id: path.id});
        };

        $scope.navigateToMethodDetails = function(state, method){
            $state.go(state, {pId: method.path, mId: method.id});
        };

        $scope.addPath = function (ev) {
            $mdDialog.show({
                    controller: 'PathAddCtrl',
                    templateUrl: 'views/path/add.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                .then(function(path){
                    $scope.list.push(path);
                    Notification.success('Path ' + path.title + ' added');

                    $state.go('path.detail',{id:path.id});
                });
        };

        $scope.deletePath = function(path) {
            var confirm = $mdDialog.confirm()
                .title('Delete selected Paths?')
                .clickOutsideToClose(true)
                .ok('Delete!')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function() {

                $scope.list.forEach(function(value){
                    if(value.selected === true){
                        value.remove().then(function (data) {
                                Notification.success('Path ' + data.title + ' removed');
                                $scope.list.splice($scope.list.indexOf(value), 1);
                            },
                            function(err){
                                Notification.error('Something went wrong!');
                            }
                        );
                    }
                });
                $state.go('path');
            });
        };

        $scope.addMethod = function (path, index, ev) {
            $mdDialog.show({
                    controller: 'MethodAddCtrl',
                    templateUrl: 'views/method/add.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    resolve: {
                        path: function () {
                            return path;
                        }
                    }
                })
                .then(function(method){
                    $scope.accordion.expand(index);
                    if(!path.methods) path.methods = [];
                    path.methods.push(method);
                    Notification.success('Method ' + method.name + ' added');

                    $state.go('path.tab',{pId: method.path.id, mId: method.id});
                });
        };

        $scope.deleteMethod = function(method, listIndex) {
            var confirm = $mdDialog.confirm()
                .title('Delete this Method?')
                .clickOutsideToClose(true)
                .ok('Delete!')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function() {
                var toDelete = Restangular.copy(method);

                Method.one(method.id).then(function (data) {
                    Notification.success('Method ' + data.name + ' deleted');
                    $scope.list[listIndex].methods.splice($scope.list[listIndex].methods.indexOf(method), 1);
                    $state.go('path');
                });
            });
        };
    });
