'use strict';

/**
 * @ngdoc function
 * @name amApp.controller:TagDetailCtrl
 * @description
 * # TagDetailCtrl
 * Controller of the amApp
 */
angular.module('amApp')
	.controller('TagDetailCtrl', function ($scope, Notification, tag) {

		$scope.tag = tag;

		$scope.save = function (tag) {
			if (tag.hasExternalDocs === false) {
				tag.externalDocsDescription = '';
				tag.externalDocsUrl = '';
			}

			tag.save().then(function (res) {
					Notification.success('Tag ' + res.name + ' saved');
				}, function (err) {
					Notification.error('Something went wrong');
				});
		};

		$scope.formFields = [
			{
				key: 'name',
				type: 'input',
				templateOptions: {
					label: 'Name',
					required: true,
					unique: true,
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
