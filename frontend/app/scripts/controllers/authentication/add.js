'use strict';

/**
 * @ngdoc function
 * @name amApp.controller:TagAddCtrl
 * @description
 * # TagAddCtrl
 * Controller of the amApp
 */
angular.module('amApp')
	.controller('AuthenticationAddCtrl', function ($scope, $mdDialog, $timeout, Authentication, createAnother, Notification) {

		$scope.createAnother = createAnother;

		$scope.add = function (authentication) {
			Authentication.post(authentication).then(
					function (data) {
						$mdDialog.hide({authentication: data, createAnother: $scope.createAnother});
						Notification.success('Authentication ' + data.key + ' added');
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
				key: 'key',
				type: 'input',
				templateOptions: {
					label: 'Key',
					required: true
				}
			},
			{
				key: 'value',
				type: 'input',
				templateOptions: {
					label: 'Value',
					required: true
				}
			},
			{
				key: 'active',
				type: 'checkbox',
				templateOptions: {
					label: 'Active'
				}
			}
		];
	});
