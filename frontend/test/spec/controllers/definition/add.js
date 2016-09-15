'use strict';

describe('Controller: DefinitionAddCtrl', function () {

  var createController,
    requestHandler,
    $rootScope,
    $httpBackend,
    $mdDialog,
    $controller,
    scope;

  beforeEach(module('amApp'));
  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $mdDialog = {
      hide: jasmine.createSpy('$mdDialog.close'),
      cancel: jasmine.createSpy('$mdDialog.dismiss'),
      result: {
        then: jasmine.createSpy('$mdDialog.result.then')
      }
    };

    $rootScope = $injector.get('$rootScope');
    scope = $rootScope.$new();

    $controller = $injector.get('$controller');
    createController = function() {
      return $controller('DefinitionAddCtrl', {
        '$scope' : scope,
        '$mdDialog' : $mdDialog
      });
    };

  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should attach form fields to scope', function () {
    createController();
    expect(scope.formFields.length).toBe(2);
  });

  it('should post definition with success', function () {

    requestHandler = $httpBackend.when('POST', 'http://localhost:1337/definitions', scope.definition)
      .respond(201,{'id':2, 'title':'two', 'description': 'test'});
    $httpBackend.expectPOST('http://localhost:1337/definitions');

    createController();

    scope.definition = {
      'title': 'testItem',
      'description': 'testItemDescription',
      'properties': []
    };

    scope.add(scope.definition);
    $httpBackend.flush();

    expect($mdDialog.hide).toHaveBeenCalled();
  });

  it('should check cancel function for dialog', function () {
    createController();
    scope.cancel();
    expect($mdDialog.cancel).toHaveBeenCalledWith('cancel');
  });

});

