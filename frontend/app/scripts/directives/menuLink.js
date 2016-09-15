'use strict';

angular.module('amApp')
	.directive('menuLink', function() {
		return {
			scope: {
				section: '='
			},
			templateUrl: 'views/directives/menu-link.html',
			link: function ($scope, $element) {

			}
		};
	});