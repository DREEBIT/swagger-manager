'use strict';

describe('Controller: PathDetailMethodCtrl', function () {

  // load the controller's module
  beforeEach(module('amApp'));

  var createController,
    scope,
    requestHandler,
    $rootScope,
    Method,
    Path,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector) {

    $rootScope = $injector.get('$rootScope');

    $httpBackend = $injector.get('$httpBackend');

    Method = $injector.get('Method');

    Path = $injector.get('Path');

    scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function(pathMock, methodMock) {
      return $controller('PathDetailCtrl', {
        '$scope' : scope ,
        'path': pathMock,
        'method': methodMock
      });
    };

  }));

  it('should attach form fields', function () {

    var pathMock = {
      "id" : 0,
      "title" : "Init Path",
      "description" : "This is the init Path",
      put : function(){

      }
    };

    var methodMock = {
      "id" : 0,
      "method" : "Init Method",
      "summary" : "This is the init Method",
      put : function(){

      }
    };

    createController(pathMock, methodMock);

    expect(scope.formFields.length).toBeDefined();
  });
});
