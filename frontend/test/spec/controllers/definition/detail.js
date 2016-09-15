'use strict';

describe('Controller: DefinitionDetailCtrl', function () {

  var createController,
    requestHandler,
    $controller,
    $rootScope,
    $httpBackend,
    definition,
    Definition,
    scope;

  // mocks
  var mockDefinition = {
    'id':'1',
    'title':'Init Definition',
    'description':'This is the init Definition',
    put : function(){}
  };
  var mockDefinition2 = {
    'id':'2',
    'title':'mockDefinition2Title',
    'description':'mockDefinition2Description'
  };
  var definitions = [
    mockDefinition,
    mockDefinition2
  ];

  beforeEach(module('amApp'));
  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');

    $rootScope = $injector.get('$rootScope');
    scope = $rootScope.$new();

    Definition = $injector.get('Definition');
    $controller = $injector.get('$controller');

    createController = function(definitionMock) {
      return $controller('DefinitionDetailCtrl', {
        '$scope' : scope ,
        'definitions': definitions,
        'definition': definitionMock
      });
    };
  }));

  it('should modify title and description of a definition', function () {
    var definitionPut = {
      'id':'2',
      'title':'New',
      'description':'Update',
      put : function(){
        scope.definition = definitionPut;
        return {
          then : function(){}
        }
      }
    };

    createController(mockDefinition);

    scope.save(definitionPut);

    expect(scope.definition.title).toBe('Init Definition');
    expect(scope.definition.description).toBe('This is the init Definition');
  });

  it('should init 3 form fields for title, description and parent definition', function(){
    createController(mockDefinition);

    expect(scope.formFields.length).toBe(3);
  });
});
