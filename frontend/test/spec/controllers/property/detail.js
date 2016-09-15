'use strict';

describe('Controller: PropertyDetailCtrl', function () {

  var $mdDialog,
    requestHandler,
    property,
    $rootScope,
    $httpBackend,
    createController,
    Definition,
    scope;

  beforeEach(module('amApp'));

  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $mdDialog = {
      hide: jasmine.createSpy('$mdDialog.close'),
      cancel: jasmine.createSpy('$mdDialog.cancel'),
      result: {
        then: jasmine.createSpy('$mdDialog.result.then')
      }
    };

    Definition = $injector.get('Definition');
    var $controller = $injector.get('$controller');

    $rootScope = $injector.get('$rootScope');
    scope = $rootScope.$new();

    createController = function(definition, property, propertyIndex, createAnother) {
      return $controller('PropertyDetailCtrl', {
        '$scope': scope ,
        '$mdDialog': $mdDialog,
        'definition': definition,
        'property': property,
        'propertyIndex': propertyIndex,
        'createAnother': createAnother
      });
    };
  }));

  it('should attach form fields, property to scope', function () {

    var definitionMock = {
      'id': '12',
      'title': 'mockTitle',
      put: function(){
      }
    };

    var propertyMock = {
      'id': '1',
      'key': 'testkey',
      put: function(){
      }
    };

    createController(definitionMock, propertyMock, null, false);

    expect(scope.formFields.length).toBe(10);
    expect(scope.property).toBe(propertyMock);
    expect(scope.createAnother).toBe(false);
  });

  it('should post property with success', function () {

    var definitionMock = {'id': '12', 'title': 'mockTitle', put: function(){}};
    var propertyMock = {'type' : 'integer', '$ref': ''};

    requestHandler = $httpBackend.when('GET', 'http://localhost:1337/definitions?sort=title+ASC')
      .respond([{'id':2, 'title':'two', 'description': 'test', 'properties' : propertyMock}]);
    $httpBackend.expectGET('http://localhost:1337/definitions?sort=title+ASC');

    requestHandler = $httpBackend.when('POST', 'http://localhost:1337/properties')
      .respond([{id: 2, key: 'testkey'}]);
    $httpBackend.expectPOST('http://localhost:1337/properties');

    createController(definitionMock, propertyMock, false);

    scope.add(propertyMock);
    $httpBackend.flush();

    expect($mdDialog.hide).toHaveBeenCalled();
  });

  it('should check cancel function for dialog', function () {

    var definitionMock = {'id': '12', 'title': 'mockTitle', put: function(){}};
    var propertyMock = {'key' : 'testkey', put: function(){}};

    createController(definitionMock, propertyMock);

    scope.cancel();
    expect($mdDialog.cancel).toHaveBeenCalledWith('cancel');
  });
});
