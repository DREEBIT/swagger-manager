'use strict';

describe('Controller: DefinitionDetailCtrl Delete', function () {

  var createController,
    $rootScope,
    Definition,
    scope;

  beforeEach(module('amApp'));
  beforeEach(module('templates'));
  beforeEach(inject(function ($injector) {
    Definition = $injector.get('Definition');

    $rootScope = $injector.get('$rootScope');
    scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function(definitionMock) {
      return $controller('DefinitionDetailCtrl', {
        '$scope' : scope ,
        'definition': definitionMock
      });
    };

  }));


});
