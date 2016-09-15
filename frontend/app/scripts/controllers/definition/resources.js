'use strict';

/**
 * @ngdoc function
 * @name amApp.controller:DefinitionResourcesCtrl
 * @formatter:on
 * @description
 * # DefinitionResourcesCtrl
 * Controller of the amApp
 */
angular.module('amApp')
	.controller('DefinitionResourcesCtrl', function ($scope, Method, Path, Response, Parameter, Property, definition) {

		$scope.definition = definition;

		$scope.definitionInResponses = [];
		$scope.definitionInParameters = [];
		$scope.definitionInDefinitions = [];

		$scope.init = function () {
			$scope.getDefinitionsInResponses();
			$scope.getDefinitionsInParameters();
			$scope.getDefinitionsInDefinitions();
		};

		$scope.getDefinitionsInResponses = function(){
			Response.getList({ $ref: $scope.definition.id }).then(function (data) {
				$scope.definitionInResponses = data;
			});
		};

		$scope.getDefinitionsInParameters = function(){
			Parameter.getList({ $ref: $scope.definition.id }).then(function (data) {
				$scope.definitionInParameters = data;
			});
		};

		$scope.getDefinitionsInDefinitions = function(){
			Property.getList({ $ref: $scope.definition.id }).then(function (data) {
				$scope.definitionInDefinitions = data;
			});
		};
	});
