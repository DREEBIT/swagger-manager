'use strict';

describe('Controller: PathListCtrl', function () {

  // load the controller's module
  beforeEach(module('amApp'));

  var PathListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PathListCtrl = $controller('PathListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {

  });
});
