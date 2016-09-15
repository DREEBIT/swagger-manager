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
    .controller('AuthenticationListCtrl', function ($scope, $state, $timeout, $log, $mdDialog, $uibModal, Restangular, Notification, Authentication) {

        $scope.$state = $state;
        $scope.toolbarOptions = {
            title: 'Authentication'
        };
        $scope.showSearch = false;
        $scope.searchIcon = 'search';
        $scope.search = '';
        $scope.list = [];

        $scope.toggleSearchBar = function(){
            $scope.showSearch = !$scope.showSearch;
            $scope.search = '';
            $scope.showSearch ? $scope.searchIcon = 'clear' : $scope.searchIcon = 'search';
        };

        $scope.init = function(){
            $scope.getAuthentication();
        };

        $scope.getAuthentication = function(){
            Authentication.getList().then(function(data){
                $scope.list = data;
            });
        };

        $scope.changeActive = function (authentication){

            var toSave = Restangular.copy(authentication);
            toSave.active = !toSave.active;

            toSave.save().then(function (data) {
                Notification.success('Header Field ' + data.key + ' set to ' + data.active);
            });
        };

        $scope.add = function (ev, createAnother) {
            $mdDialog.show({
                controller: 'AuthenticationAddCtrl',
                templateUrl: 'views/authentication/add.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                locals: {
                    createAnother: createAnother
                }
            }).then(function (res) {
                $scope.list.push(res.authentication);

                if (res.createAnother) {
                    $scope.add(null, true);
                }
            });
        };

        $scope.delete = function(){

            var confirm = $mdDialog.confirm()
                .title('Delete selected Authentication?')
                .clickOutsideToClose(true)
                .ok('Delete!')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function () {

                $scope.list.forEach(function(value){
                    if(value.selected === true){
                        value.remove().then(function (data) {
                                Notification.success('Authentication ' + data.key + ' deleted');
                                $scope.list.splice($scope.list.indexOf(value), 1);
                            },
                            function(err){
                                Notification.error('Something went wrong!');
                            }
                        );
                    }
                });
            });
        };
    });
