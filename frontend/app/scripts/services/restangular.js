'use strict';

angular.module('amApp')
		.factory('Definition', function (Restangular) {
			return Restangular.service('definitions');
		})
		.factory('Property', function (Restangular) {
			return Restangular.service('properties');
		})
		.factory('Path', function (Restangular) {
			return Restangular.service('paths');
		})
		.factory('Method', function (Restangular) {
			return Restangular.service('methods');
		})
		.factory('Parameter', function (Restangular) {
			return Restangular.service('parameters');
		})
		.factory('Response', function (Restangular) {
			return Restangular.service('responses');
		})
		.factory('Tag', function (Restangular) {
			return Restangular.service('tags');
		})
		.factory('Setting', function (Restangular) {
			return Restangular.service('projectsettings');
		})
		.factory('Authentication', function (Restangular) {
			return Restangular.service('authentications');
		})
		.factory('Test', function (Restangular) {
			return Restangular.service('tests');
		});

