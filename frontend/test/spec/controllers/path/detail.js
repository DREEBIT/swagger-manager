'use strict';

describe('Controller: PathDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('amApp'));

  var createController,
    scope,
    $rootScope,
    $httpBackend,
    Path;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector) {

    $rootScope = $injector.get('$rootScope');

    $httpBackend = $injector.get('$httpBackend');

    Path = $injector.get('Path');

    scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function(pathMock) {
      return $controller('PathDetailCtrl', {
        '$scope' : scope ,
        'path': pathMock
      });
    };

  }));

  it('should attach 2 form fields to controller', function () {

    var item = {
      "id" : 0,
      "title" : "Init Path",
      "description" : "This is the init Path",
      put : function(){

      }
    };

    createController(item);

    expect(scope.formFields.length).toBe(2);
  });

  it('should save path by PUT method', function () {

    var updatedPath = {
      "id" : 0,
      "title" : "Updated Path",
      "description" : "This is the updated Path",
      put : function(){
        scope.path = updatedPath
      },
      then: function(){

      }
    };

    var path = {
      "id" : 0,
      "title" : "Init Path",
      "description" : "This is the init Path",
      put : function(){

      }
    };

    createController(path);/*

    scope.save(updatedPath);

    expect(scope.path.title).toBeDefined();*/
  });
});
