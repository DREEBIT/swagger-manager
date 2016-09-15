'use strict';

angular.module('amApp')
	.directive('menuToggle', [ function(){
		return {
			scope: {
				section: '='
			},
			templateUrl: 'views/directives/menu-toggle.html',
			link: function($scope) {

				$scope.toggleIcon = $scope.section.toggleIcons[0];
				$scope.isOpen = false;

				$scope.toggle = function() {

					if($scope.isOpen){
						$scope.toggleIcon = $scope.section.toggleIcons[0];
					}else{
						$scope.toggleIcon = $scope.section.toggleIcons[1];
					}
					$scope.isOpen = !$scope.isOpen;

				};
			}
		};
	}]);