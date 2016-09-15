'use strict';

describe('Controller: ParametersTableCtrl', function () {

  // load the controller's module
  beforeEach(module('amApp'));

  var createController,
    requestHandler,
    $rootScope,
    $httpBackend,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector) {

    $rootScope = $injector.get('$rootScope');

    $httpBackend = $injector.get('$httpBackend');

    scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function(methodMock) {
      return $controller('ParametersTableCtrl', {
        '$scope' : scope ,
        'method': methodMock
      });
    };

  }));/*

  it('should test save function', function () {

    var methodMock = {
      'path_id' : 12,
      'id' : 1,
      'method' : {
        'parameters' : [
          {
            'name': 'name1'
          }
        ]
      },
      put : function(){

      }
    };

    var updateMethodMock = {
      'path_id' : 12,
      'id' : 1,
      'method' : {
        'parameters' : [
          {
            'name': 'name2'
          }
        ]
      },
      put : function(){
        scope.method = updateMethodMock;
      }
    };

    createController(methodMock);

    /!*scope.save(updateMethodMock);*!/

    expect(scope.method.method.parameters[0].name).toBe('name2');
  });*/
});
