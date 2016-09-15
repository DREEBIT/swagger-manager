'use strict';

describe('Controller: PathAddCtrl', function () {

  // load the controller's module
  beforeEach(module('amApp'));
  beforeEach(module('templates'));

  var requestHandler,
    scope,
    $httpBackend,
    $mdDialog,
    createController,
    $rootScope;

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

    inject(function(_$browser_) {
      _$browser_['cookies'] = function() { return {}; }
    });

    $httpBackend = $injector.get('$httpBackend');

    scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('PathAddCtrl', {
        '$scope' : scope,
        '$mdDialog' : $mdDialog
      });
    };

  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should attach title and description form fields to modal', function () {

    createController();

    expect(scope.formFields.length).toBe(2);

  });

  it('should post path with success', function () {

    var itemMock = {
      'id' : '',
      'title': 'testItem',
      'description': 'testItemDescription'
    };
    var dataMock = {
      'id' : 1,
      'title': 'testItem',
      'description': 'testItemDescription',
      'post' : function(){

      }
    };

    requestHandler = $httpBackend.when('POST', 'http://localhost:1337/paths', itemMock)
      .respond(201, dataMock);
    $httpBackend.expectPOST("http://localhost:1337/paths");

    createController();

    scope.add(itemMock);
    $httpBackend.flush();

    expect($mdDialog.hide).toHaveBeenCalled();
  });

  it('should check cancel function for modalInstance', function () {

    createController();

    scope.cancel();
    expect($mdDialog.cancel).toHaveBeenCalledWith('cancel');
  });
});
