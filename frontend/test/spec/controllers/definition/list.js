'use strict';

describe('Controller: DefinitionListCtrl', function () {

  var DefinitionListCtrl,
    createController,
    $rootScope,
    $httpBackend,
    requestHandler,
    scope;

  beforeEach(module('amApp'));
  beforeEach(module('templates'));
  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');

    $rootScope = $injector.get('$rootScope');
    scope = $rootScope.$new();

    var $controller = $injector.get('$controller');
    createController = function() {
      return $controller('DefinitionListCtrl', {
        '$scope' : scope
      });
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should init list', function () {
    var mockDefinitionListResponse = [{
      "id":1,
      "title":"one"
    },{
      "id":2,
      "title":"two"
    }];

    requestHandler = $httpBackend.when('GET', 'http://localhost:1337/definitions?sort=title+ASC')
      .respond(200,mockDefinitionListResponse);
    $httpBackend.expectGET('http://localhost:1337/definitions?sort=title+ASC');

    createController();

    scope.init();
    $httpBackend.flush();

    expect(scope.list.length).toBe(2);
    expect(scope.list[0].id).toBe(1);
    expect(scope.list[0].title).toBe("one");
    expect(scope.list[1].id).toBe(2);
    expect(scope.list[1].title).toBe("two");
  });
});
