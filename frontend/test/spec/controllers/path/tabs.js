'use strict';

describe('Controller: PathTabsCtrl', function () {

  // load the controller's module
  beforeEach(module('amApp'));

  beforeEach(module('templates'));

  var scope,
    $rootScope,
    $httpBackend,
    createController;


  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector) {

    $rootScope = $injector.get('$rootScope');

    $httpBackend = $injector.get('$httpBackend');

    scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function(pathMock, methodMock){
      return $controller('PathTabsCtrl',
        {
          '$scope':scope,
          'path': pathMock,
          'method': methodMock
        });
    };

  }));

  it('should attach tabs to the scope', function () {

    var pathMock = {
      'id':1,
      'title':'MockInstance1',
      'description':'MockDescription1'
    };

    var methodMock = {
      'id':2,
      'title':'MockInstance2',
      'description':'MockDescription2'
    };

    createController(pathMock, methodMock);

    expect(scope.tabData.length).toBe(3);

  });
});
