'use strict';

/**
 * @ngdoc function
 * @name amApp.controller:TagListCtrl
 * @description
 * # TagListCtrl
 * Controller of the amApp
 */
angular.module('amApp')
		.controller('TagListCtrl', function ($scope, $state, $uibModal, $mdDialog, Tag, Notification) {

			$scope.$state = $state;
			$scope.toolbarTitle = 'Tags';
			$scope.showSearch = false;
			$scope.search = {};
			$scope.searchIcon = 'search';
			$scope.list = [];
			$scope.selected = false;

			$scope.toggleSearchBar = function(){
				$scope.showSearch = !$scope.showSearch;
				$scope.search.name = '';
				$scope.showSearch ? $scope.searchIcon = 'clear' : $scope.searchIcon = 'search';
			};

			$scope.init = function () {
				$scope.getTags();
			};

			$scope.getTags = function(){
				Tag.getList({sort: 'name ASC'}).then(function (data) {
					$scope.list = data;
				});
			};

			$scope.navigateTo = function (state, params) {
				$state.go(state, {id: params.id, tag: params.tag});
			};

			$scope.add = function (ev, createAnother) {
				$mdDialog.show({
							controller: 'TagAddCtrl',
							templateUrl: 'views/tag/add.html',
							parent: angular.element(document.body),
							targetEvent: ev,
							clickOutsideToClose: true,
							resolve: {
								tagList: function () {
									return $scope.list;
								}
							},
							locals: {
								createAnother: createAnother
							}
						}).then(function (res) {
							$scope.list.push(res.tag);
							$state.go('tag.detail', {id: res.tag.id, tag: res.tag});

							if (res.createAnother) {
								$scope.add(null, true);
							}
						});
			};

			$scope.delete = function () {
				var confirm = $mdDialog.confirm()
						.title('Delete selected Tags?')
						.clickOutsideToClose(true)
						.ok('Delete!')
						.cancel('Cancel');

				$mdDialog.show(confirm).then(function () {

					$scope.list.forEach(function(value){
						if(value.selected === true){
							value.remove().then(function (data) {
										Notification.success('Tag ' + data.name + ' deleted');
										$scope.list.splice($scope.list.indexOf(value), 1);
									},
									function(err){
										Notification.error('Something went wrong!');
									}
							);
						}
					});
					$state.go('tag');
				});
			};
		});
