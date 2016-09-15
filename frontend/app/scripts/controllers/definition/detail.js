'use strict';

/**
 * @ngdoc function
 * @name amApp.controller:DefinitionDetailCtrl
 * @description
 * # DefinitionDetailCtrl
 * Controller of the amApp
 */
angular.module('amApp')
		.controller('DefinitionDetailCtrl', function ($scope, $state, $q, Restangular, Definition, Notification, definitions, definition) {

			$scope.definition = definition;
			$scope.definitions = definitions;

			$scope.save = function (definition) {
				var toSave = Restangular.copy(definition);
				delete toSave.properties;

				toSave.save().then(function (res) {
					Notification.success('Definition ' + res.title + ' saved');
				}, function (res) {
					if (res.data !== null) {
						Notification.error('' + res.data.summary);
					} else {
						Notification.error('Something went wrong');
					}
				});
			};

			$scope.formFields = [
				{
					key: 'title',
					type: 'input',
					templateOptions: {
						label: 'Title',
						required: true,
						focus: true
					}
				},
				{
					key: 'description',
					type: 'textarea',
					templateOptions: {
						label: 'Description',
						rows: 1
					}
				},
				{
					key: 'extends',
					type: 'md-auto-complete',
					model: $scope.definition,
					templateOptions: {
						label: 'Extends / Parent Definition',
						valueProp: 'id',
						labelProp: 'title',
						placeholder: 'Select Extends',
						options: $scope.definitions
					}
				}
			];
		});
