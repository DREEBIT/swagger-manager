'use strict';

/**
 * @ngdoc overview
 * @name amApp
 * @description
 * # amApp
 *
 * Main module of the application.
 */
angular
	.module('amApp', [
		'ngAnimate',
		'ngCookies',
		'ngMessages',
		'ngResource',
		'ngSanitize',
		'ngMaterial',
		'ngAria',
		'ngMdIcons',
		'md.data.table',
		'vAccordion',
		'ui.router',
		'formly',
		'formlyMaterial',
		'ui.bootstrap',
		'ui.router.tabs',
		'ui.select',
		'restangular',
		'angular-loading-bar',
		'luegg.directives'
	])
	.config(function ($urlRouterProvider, $stateProvider, RestangularProvider, $mdThemingProvider ) {

		$mdThemingProvider.theme('default')
				.primaryPalette('blue');

		var baseUrl = 'http://' + window.location.hostname + ':1337';
		RestangularProvider.setBaseUrl(baseUrl);

		$urlRouterProvider.otherwise('/');
		$urlRouterProvider.when('/definitions/:id', '/definitions/:id/details');
		$urlRouterProvider.when('/paths/:pId/methods/:mId', '/paths/:pId/methods/:mId/details');

		$stateProvider
				.state('dashboard', {
					url: '/dashboard',
					templateUrl: 'views/dashboard/overview.html',
					controller: 'DashboardOverviewCtrl'
				})
				.state('projectsetting', {
					url: '/projectsettings',
					templateUrl: 'views/setting/detail.html',
					controller: 'SettingDetailCtrl'
				})
				.state('tag', {
					url: '/tags',
					templateUrl: 'views/tag/list.html',
					controller: 'TagListCtrl'
				})
				.state('tag.detail', {
					url: '/:id',
					params: {
						tag: null
					},
					templateUrl: 'views/tag/detail.html',
					controller: 'TagDetailCtrl',
					resolve: {
						tag: function ($stateParams) {
							return $stateParams.tag;
						}
					}
				})
				.state('definition', {
					url: '/definitions',
					templateUrl: 'views/definition/list.html',
					controller: 'DefinitionListCtrl'
				})
				.state('definition.tab', {
					url: '/:id',
					params: {
						definition: null
					},
					templateUrl: 'views/definition/tabs.html',
					controller: 'DefinitionTabsCtrl',
					resolve: {
						definition: function ($stateParams, Definition) {
							return Definition.one($stateParams.id).get().then(function (data) {
								return data;
							});
						},
						definitions: function ($stateParams, Definition) {
							return Definition.getList({sort: 'title ASC'}).then(function (data) {
								var results = [];

								data.forEach(function(item){
									if(item.id !== $stateParams.id){
										results.push({
											id: item.id,
											title: item.title
										});
									}
								});
								return results;
							});
						}
					}
				})
				.state('definition.tab.detail', {
					url: '/details',
					templateUrl: 'views/definition/detail.html',
					controller: 'DefinitionDetailCtrl'
				})
				.state('definition.tab.properties', {
					url: '/properties',
					templateUrl: 'views/property/table.html',
					controller: 'PropertyTableCtrl'
				})
				.state('definition.tab.sample', {
					url: '/sample',
					templateUrl: 'views/definition/sample.html',
					controller: 'DefinitionSampleCtrl'
				})
				.state('definition.tab.resources', {
					url: '/resources',
					templateUrl: 'views/definition/resources.html',
					controller: 'DefinitionResourcesCtrl'
				})
				.state('path', {
					url: '/paths',
					templateUrl: 'views/path/list.html',
					controller: 'PathListCtrl'
				})
				.state('path.detail', {
					url: '/:id/details',
					templateUrl: 'views/path/detail.html',
					controller: 'PathDetailCtrl',
					resolve: {
						path: function ($http, $stateParams, Path) {
							return Path.one($stateParams.id).get().then(function (data) {
								return data;
							});
						}
					}
				})
				.state('path.tab', {
					url: '/:pId/methods/:mId',
					templateUrl: 'views/method/tabs.html',
					controller: 'PathTabsCtrl',
					resolve: {
						path: function ($http, $stateParams, Path) {
							return Path.one($stateParams.pId).get().then(function (data) {
								return data;
							});
						},
						method: function ($http, $stateParams, Method) {
							return Method.one($stateParams.mId).get().then(function (data) {
								return data;
							});
						}
					}
				})
				.state('path.tab.detail', {
					url: '/details',
					templateUrl: 'views/method/detail.html',
					controller: 'MethodDetailCtrl'
				})
				.state('path.tab.parameters', {
					url: '/parameters',
					templateUrl: 'views/parameter/table.html',
					controller: 'ParametersTableCtrl'

				})
				.state('path.tab.responses', {
					url: '/responses',
					templateUrl: 'views/response/table.html',
					controller: 'ResponsesTableCtrl'
				})
				.state('authentication', {
					url: '/authentications',
					templateUrl: 'views/authentication/list.html',
					controller: 'AuthenticationListCtrl'
				})
				.state('test', {
					url: '/tests',
					templateUrl: 'views/test/list.html',
					controller: 'TestListCtrl'
				});
	})
	.filter('nospace', function () {
		return function (value) {
			return (!value) ? '' : value.replace(/ /g, '');
		};
	})
	.filter('humanizeDoc', function () {
		return function (doc) {
			if (!doc) { return; }
			if (doc.type === 'directive') {
				return doc.name.replace(/([A-Z])/g, function ($1) {
					return '-' + $1.toLowerCase();
				});
			}
			return doc.label || doc.name;
		};
	});

