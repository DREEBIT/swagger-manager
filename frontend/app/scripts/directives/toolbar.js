'use strict';

angular.module('amApp')
	.directive('toolbar', function ($mdSidenav, $mdToast, $animate, $log) {

		return {
			restrict: 'AE',
			templateUrl: 'views/directives/toolbar.html',
			replace: true,
			scope: {
				control: '=',
				data: '='
			},
			link: function ($scope, element, attrs) {

				$scope.toggleSidenav = function (menuId) {
					$mdSidenav(menuId).toggle();
				};
			}
		};
	});
