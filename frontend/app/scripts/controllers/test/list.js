'use strict';

/**
 * @ngdoc function
 * @name amApp.controller:TestListCtrl
 * @description
 * # TestListCtrl
 * Controller of the amApp
 */
angular.module('amApp')
	.controller('TestListCtrl', function ($scope, $state, $uibModal, $mdDialog, $resource, Method, Notification, Restangular, $http) {

		$scope.$state = $state;
		$scope.toolbarTitle = 'Tests';
		$scope.list = [];
		$scope.testResults = [];
		$scope.showLog = true;
		$scope.autoScrollLog = true;
		$scope.autoScrollIcon = 'visibility_off';
		$scope.showLogIcon = 'expand_less';

		$scope.showSearch = false;
		$scope.search = {};
		$scope.searchIcon = 'search';

		$scope.types = ['', 'error'];
		$scope.type = '';

		window.location.hostname === 'localhost' ? $scope.location = 'http://127.0.0.1' : $scope.location = 'http://' + window.location.hostname;

		$scope.setFilterType = function(type){
			$scope.type = type;
		};

		$scope.toggleAutoScrollLog = function(bool){
			$scope.autoScrollLog = bool;
			bool ? $scope.autoScrollIcon = 'visibility_off' : $scope.autoScrollIcon = 'visibility';
		};

		$scope.toggleSearchBar = function(){
			$scope.showSearch = !$scope.showSearch;
			$scope.search = '';
			$scope.showSearch ? $scope.searchIcon = 'clear' : $scope.searchIcon = 'search';
		};

		$scope.toggleShowLog = function(bool){
			$scope.showLog = bool;
			bool ? $scope.showLogIcon = 'expand_less' : $scope.showLogIcon = 'expand_more';
		};

		$scope.clearLog = function(){
			$scope.testResults = [];
		};

		$scope.init = function () {
			$scope.getMethods();
		};

		$scope.getMethods = function(){
			Method.getList({sort: 'name ASC'}).then(function (data) {
				$scope.list = data;
			});
		};

		$scope.navigateTo = function(state, method){
			$state.go(state, {pId: method.path.id, mId: method.id});
		};

		$scope.changeTestActive = function (method){
			var toSave = Restangular.copy(method);
			delete toSave.parameters;
			delete toSave.responses;

			toSave.testActive = !toSave.testActive;
			toSave.path = method.path.id;
			toSave.save().then(function (data) {
				Notification.success('Test Automation for Method ' + data.name + ' set to ' + data.testActive);
			});
		};

		$scope.runAutomatedTests = function(){
			$http.post($scope.location + ':1337/tests', {}).then(function(res) {
				if(res.data.type === 'info'){
					Notification.info(res.data.message);
				} else {
					Notification.success(res.data.message);
					res.data.results.forEach(function(result) {
						$scope.testResults.push(result);
					});
				}
			}, function(res) {
				Notification.error(res.data.message);
			});
		};

		$scope.runSingleTest = function(){
			Notification.info('Not yet implemented!')
		};
	});
