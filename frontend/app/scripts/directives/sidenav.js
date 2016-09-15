'use strict';

angular.module('amApp')
	.directive('sidenav', function ($location, $mdSidenav, Setting) {

		return {

			restrict: 'AE',
			templateUrl: 'views/directives/sidenav.html',
			replace: true,

			link: function ($scope, element, attrs) {

				$scope.sections = [];

				$scope.init = function () {
					Setting.getList().then(function (data) {
						if (data[0]) {
							$scope.linkSwaggerUi = data[0].linkSwaggerUi;

						} else {
							Setting.post({'id': 1}).then(function (data) {
								$scope.linkSwaggerUi = data.linkSwaggerUi;
							});
						}
					});
				};

				$scope.init();

				$scope.sections.push({
					name: 'Dashboard',
					type: 'link',
					state: 'dashboard',
					icon: 'developer_dashboard'
				});

				$scope.sections.push({
					name: 'Project Settings',
					type: 'link',
					state: 'projectsetting',
					icon: 'settings'
				});

				$scope.sections.push({
					name: 'API Configuration',
					type: 'toggle',
					toggleIcons: ['expand_more','expand_less'],
					pages: [{
						name: 'Tags',
						type: 'link',
						state: 'tag',
						icon: 'style'
					},{
						name: 'Definitions',
						type: 'link',
						state: 'definition',
						icon: 'settings_ethernet'
					},{
						name: 'Paths',
						type: 'link',
						state: 'path',
						icon: 'transform'
					}]
				});

				$scope.sections.push({
					name: 'Test Suite',
					type: 'toggle',
					toggleIcons: ['expand_more','expand_less'],
					pages: [{
						name: 'Authentication',
						type: 'link',
						state: 'authentication',
						icon: 'vpn_key'
					},{
						name: 'Tests',
						type: 'link',
						state: 'test',
						icon: 'slow_motion_video'
					}]
				});

				$scope.sections.push({
					name: 'Link to SwaggerUI',
					type: 'external-link',
					link: '',
					icon: 'link',
					tooltip: 'Please configure Link to SwaggerUI in Project Settings!'
				});

				$scope.toggleSidenav = function (menuId) {
					$mdSidenav(menuId).toggle();
				};

			}
		};
	});
