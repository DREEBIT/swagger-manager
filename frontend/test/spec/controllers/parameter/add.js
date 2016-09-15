'use strict';

describe('Controller: PathAddParameterCtrl', function () {

  // load the controller's module
  beforeEach(module('amApp'));

  var createController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    createController = function(parameterMock) {
      return $controller('PathAddParameterCtrl', {
        '$scope' : scope ,
        'parameter': parameterMock
      });
    };
  }));

  it('should attach a list of awesomeThings to the scope', function () {

  });
});
