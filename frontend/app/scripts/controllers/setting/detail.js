'use strict';

/**
 * @ngdoc function
 * @name amApp.controller:SettingDetailCtrl
 * @description
 * # SettingDetailCtrl
 * Controller of the amApp
 */
angular.module('amApp')
	.controller('SettingDetailCtrl', function ($scope, $log, $mdToast, $animate, Setting, Notification) {

		$scope.toolbarTitle = 'Project Settings';

		$scope.init = function () {
			Setting.getList().then(function (data) {
				if (data[0]) {
					$scope.setting = data[0];
				} else {
					Setting.post({'id': 1}).then(function (data) {
						$scope.setting = data;
					});
				}
			});
		};

		$scope.save = function (setting) {
			if (setting.schemes === '') setting.schemes = null;

			setting.put();
			Notification.success('Project Settings saved');
		};

		$scope.swaggerFormFields = [
			{
				className: 'layout-gt-sm-row',
				fieldGroup: [
					{
						className: 'flex',
						key: 'swagger',
						type: 'input',
						templateOptions: {
							label: 'Swagger Version'
						}
					},
					{
						className: 'flex',
						key: 'linkSwaggerUi',
						type: 'input',
						templateOptions: {
							label: 'Link to Swagger UI',
							type: 'URL'
						}
					}
				]
			},
			{
				className: 'layout-gt-sm-row',
				fieldGroup: [
					{
						className: 'flex',
						key: 'host',
						type: 'input',
						templateOptions: {
							label: 'Host'
						}
					},
					{
						className: 'flex',
						key: 'basePath',
						type: 'input',
						templateOptions: {
							label: 'Base Path'
						}
					},
					{
						className: 'flex',
						key: 'schemes',
						type: 'select',
						templateOptions: {
							label: 'Schemes',
							valueProp: 'name',
							labelProp: 'name',
							options: [{'name': ''}, {'name': 'http'}, {'name': 'https'}, {'name': 'ws'}, {'name': 'wss'}]
						}
					}
				]
			}
		];

		$scope.testFormFields = [
			{
				key: 'testHost',
				type: 'input',
				templateOptions: {
					label: 'Host for Testing'
				}
			}
		];

		$scope.infoFormFields = [
			{
				className: 'layout-gt-sm-row',
				fieldGroup: [
					{
						className: 'flex',
						key: 'title',
						type: 'input',
						templateOptions: {
							label: 'Title'
						}
					},
					{
						className: 'flex',
						key: 'version',
						type: 'input',
						templateOptions: {
							label: 'Version'
						}
					}
				]
			},
			{
				key: 'description',
				type: 'input',
				templateOptions: {
					label: 'Description'
				}
			},
			{
				key: 'termsOfService',
				type: 'input',
				templateOptions: {
					label: 'Terms of Service'
				}
			}
		];

		$scope.contactFormFields = [
			{
				className: 'layout-gt-sm-row',
				fieldGroup: [
					{
						className: 'flex',
						key: 'contactName',
						type: 'input',
						templateOptions: {
							label: 'Contact Name'
						}
					},
					{
						className: 'flex',
						key: 'contactEmail',
						type: 'input',
						templateOptions: {
							type: 'email',
							label: 'Email'
						}
					}
				]
			},
			{
				key: 'contactUrl',
				type: 'input',
				templateOptions: {
					type: 'url',
					label: 'URL'
				}
			}
		];

		$scope.licenceFormFields = [
			{
				key: 'licenceName',
				type: 'input',
				templateOptions: {
					label: 'Name'
				}
			},
			{
				key: 'licenceUrl',
				type: 'input',
				templateOptions: {
					type: 'url',
					label: 'URL'
				}
			}
		];

		$scope.externalDocsFormFields = [
			{
				key: 'externalDocsUrl',
				type: 'input',
				templateOptions: {
					type: 'url',
					label: 'URL'
				}
			},
			{
				key: 'externalDocsDescription',
				type: 'input',
				templateOptions: {
					label: 'Description'
				}
			}
		];
	});
