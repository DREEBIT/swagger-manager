'use strict';

angular.module('amApp')
	.directive('menuExternalLink', function(Setting) {
		return {
			scope: {
				section: '='
			},
			templateUrl: 'views/directives/menu-external-link.html',
			link: function ($scope, $element) {


				$scope.init = function () {
					Setting.getList().then(function (data) {
						if (data[0]) {
							$scope.section.link = data[0].linkSwaggerUi;

						} else {
							Setting.post({'id': 1}).then(function (data) {
								$scope.section.link = data.linkSwaggerUi;
							});
						}
					});
				};

				$scope.init();
			}
		};
	});