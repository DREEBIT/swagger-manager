'use strict';

describe('Controller: ResponsesTableCtrl', function () {

  beforeEach(module('amApp'));

  var createController,
    requestHandler,
    $rootScope,
    $httpBackend,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector) {

    $rootScope = $injector.get('$rootScope');

    $httpBackend = $injector.get('$httpBackend');

    scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function(methodMock) {
      return $controller('ResponsesTableCtrl', {
        '$scope' : scope ,
        'method': methodMock
      });
    };

  }));
});
