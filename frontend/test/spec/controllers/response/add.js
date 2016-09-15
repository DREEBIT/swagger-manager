'use strict';

describe('Controller: ResponseDetailCtrl', function () {

  beforeEach(module('amApp'));

  var $mdDialog,
    $rootScope,
    $httpBackend,
    createController,
    scope;

  beforeEach(inject(function ($injector) {

    $rootScope = $injector.get('$rootScope');

    $mdDialog = {
      hide: jasmine.createSpy('$mdDialog.hide'),
      cancel: jasmine.createSpy('$mdDialog.cancel'),
      result: {
        then: jasmine.createSpy('$mdDialog.result.then')
      }
    };

    $httpBackend = $injector.get('$httpBackend');

    var $controller = $injector.get('$controller');

    scope = $rootScope.$new();

    createController = function(method, response, responseIndex) {

      return $controller('ResponseDetailCtrl', {
        '$scope' : scope ,
        '$mdDialog' : $mdDialog,
        'method' : method,
        'response': response,
        'responseIndex': responseIndex,
        'createAnother': false
      });
    };
  }));

  it('should attach a list predefined statuscodes and formFields to controller', function () {

    var methodMock = {'id': '1', 'description': 'description'};
    var responseMock = {'200': {description: "successful operation"}};

    createController(methodMock, responseMock, 0);
    expect(scope.formFields).toBeDefined();
  });

  it('should check cancel function for dialog', function () {

    var methodMock = {'id': '1', 'description': 'description'};
    var responseMock = {'index' : 200, 'isArray' : true};

    createController(methodMock,responseMock, 0);

    scope.cancel();
    expect($mdDialog.cancel).toHaveBeenCalledWith('cancel');
  });

  it('should check submit function for dialog', function () {

    var methodMock = {'id': '1', 'description': 'description'};
    var responseMock = {save:function(){}};
    var updatedResponseMock = {'index' : 200, 'isArray' : true, 'description' : 'descriptionTest',save:function(){ return {then:function(){}}}};
    createController(methodMock,responseMock, 0);

    responseMock = updatedResponseMock;
    scope.save(responseMock);

    /*expect($mdDialog.hide).toHaveBeenCalled();*/
  });
});
