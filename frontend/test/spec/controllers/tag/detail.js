'use strict';

describe('Controller: TagDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('amApp'));

  var TagDetailCtrl,
    scope,
    createController;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    createController = $controller('TagDetailCtrl', {
      $scope: scope
    });
  }));

});
