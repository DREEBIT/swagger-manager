'use strict';

describe('Controller: DefinitionTabsCtrl', function () {

  var scope,
    $rootScope,
    $httpBackend,
    createController;

  beforeEach(module('amApp'));
  beforeEach(module('templates'));
  beforeEach(inject(function ($injector) {

    $httpBackend = $injector.get('$httpBackend');

    $rootScope = $injector.get('$rootScope');
    scope = $rootScope.$new();

    var $controller = $injector.get('$controller');
    createController = function(definitionMock){
      return $controller('DefinitionTabsCtrl',{
          '$scope':scope,
          'definition': definitionMock
        });
    };
  }));

  it('should attach 4 tabs to the scope', function () {

    var mockDefinition = {
      id: 1,
      title: 'MockInstance',
      description: 'MockDescription',
      properties: [{
        key: 'MockKey'
      }]
    };

    createController(mockDefinition);

    expect(scope.tabData.length).toBe(4);
  });
});
