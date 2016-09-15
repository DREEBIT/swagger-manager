'use strict';

describe('Controller: PathAddMethodCtrl', function () {

  // load the controller's module
  beforeEach(module('amApp'));

  var scope,
    createController,
    $mdDialog,
    $rootScope,
    requestHandler,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector) {

    $rootScope = $injector.get('$rootScope');

    $mdDialog = {                    // Create a mock object using spies
      hide: jasmine.createSpy('$mdDialog.hide'),
      cancel: jasmine.createSpy('$mdDialog.cancel'),
      result: {
        then: jasmine.createSpy('$mdDialog.result.then')
      }
    };

    $httpBackend = $injector.get('$httpBackend');

    // Get hold of a scope (i.e. the root scope)
    scope = $rootScope.$new();

    // The $controller service is used to create instances of controllers
    var $controller = $injector.get('$controller');


    createController = function(pathMock) {
      return $controller('MethodAddCtrl', {
        '$scope' : scope,
        '$mdDialog' : $mdDialog,
        'path' : pathMock
      });
    };

  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should check cancel function for modalInstance', function () {
    var pathMock = {'id': 2};
    createController(pathMock);

    scope.cancel();
    expect($mdDialog.cancel).toHaveBeenCalledWith('cancel');
  });

  /*it('should check add function for modalInstance', function () {

    var pathMock = {'id' : 2};
    var methodMock = {'path_id': 2 , 'id': 0, 'name' : 'POST', 'parameter' : []};

    requestHandler = $httpBackend.when('POST', 'http://localhost:1337/method')
      .respond(201,methodMock);
    $httpBackend.expectPOST('http://localhost:1337/method');

    requestHandler = $httpBackend.when('GET', 'http://localhost:1337/method')
      .respond();
    $httpBackend.expectGET("http://localhost:1337/method");

    requestHandler = $httpBackend.when('GET', 'http://localhost:1337/path')
      .respond();
    $httpBackend.expectGET("http://localhost:1337/path");

    createController(pathMock);

    scope.add(methodMock);
    $httpBackend.flush();

    expect($modalInstance.close).toHaveBeenCalledWith(scope.method.path_id, scope.method_id);
  });*/

  it('should check cancel function for modalInstance', function () {

    var pathMock = {'id': 2};

    createController(pathMock);

    scope.cancel();
    expect($mdDialog.cancel).toHaveBeenCalledWith('cancel');
  });
});
