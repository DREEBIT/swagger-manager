'use strict';

/**
 * @ngdoc function
 * @name amApp.controller:TagAddCtrl
 * @description
 * # TagAddCtrl
 * Controller of the amApp
 */
angular.module('amApp')
	.controller('TagAddCtrl', function ($scope, $mdDialog, $timeout, Tag, tagList, createAnother, Notification) {

		$scope.list = tagList;
		$scope.createAnother = createAnother;

		$scope.add = function (tag) {
			Tag.post(tag).then(
					function (data) {
						$mdDialog.hide({tag: data, createAnother: $scope.createAnother});
						Notification.success('Tag ' + data.name + ' added');
					},
					function(err){
						Notification.error('Something went wrong!');
					});
		};

		$scope.cancel = function () {
			$mdDialog.cancel('cancel');
		};

		$scope.formFields = [
			{
				key: 'name',
				type: 'input-focus',
				templateOptions: {
					label: 'Name',
					required: true,
					focus: true
				}
			},
			{
				key: 'description',
				type: 'textarea',
				templateOptions: {
					label: 'Description'
				}
			},
			{
				key: 'hasExternalDocs',
				type: 'checkbox',
				templateOptions: {
					label: 'Has External Docs'
				}
			},
			{
				key: 'externalDocsUrl',
				type: 'input',
				templateOptions: {
					label: 'External Docs URL',
					type: 'url'
				},
				hideExpression: '!model.hasExternalDocs'
			},
			{
				key: 'externalDocsDescription',
				type: 'input',
				templateOptions: {
					label: 'External Docs Description'
				},
				hideExpression: '!model.hasExternalDocs'
			}
		];
	});
