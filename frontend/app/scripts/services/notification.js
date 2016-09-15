'use strict';

angular.module('amApp')
	.service('Notification', function ($mdToast, $animate) {
		this.success = function (msg) {
			$mdToast.show({
				template: (
					'<md-toast class="notification-success md-center" layout-align="center">' +
					'<span><ng-md-icon icon="done" style="fill:green"></ng-md-icon></span>' +
					'<span>&nbsp;' + msg + ' </span>' +
					'</md-toast>'
				),
				icon: 'done',
				hideDelay: 4000,
				position: 'top left right'
			});
		};
		this.error = function (msg) {
			$mdToast.show({
				template: (
				'<md-toast class="notification-error md-center" layout-align="center">' +
				'<span><ng-md-icon icon="error" style="fill:orangered"></ng-md-icon></span>' +
				'<span>&nbsp;' + msg + ' </span>' +
				'</md-toast>'),
				icon: 'error',
				hideDelay: 4000,
				position: 'top left right'
			});
		};
		this.info = function (msg) {
			$mdToast.show({
				template: (
				'<md-toast class="notification-info md-center" layout-align="center">' +
				'<span><ng-md-icon icon="warning" style="fill:orange"></ng-md-icon></span>' +
				'<span>&nbsp;' + msg + ' </span>' +
				'</md-toast>'),
				icon: 'warning',
				hideDelay: 4000,
				position: 'top left right'
			});
		};
	});
