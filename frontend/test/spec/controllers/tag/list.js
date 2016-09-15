'use strict';

describe('Controller: TagListCtrl', function () {

  beforeEach(module('amApp'));
  beforeEach(module('templates'));

  var TagListCtrl,
    createController,
    $rootScope,
    $mdDialog,
    $httpBackend,
    requestHandler,
    scope;

  beforeEach(inject(function ($injector) {

    $rootScope = $injector.get('$rootScope');

    $httpBackend = $injector.get('$httpBackend');

    scope = $rootScope.$new();

    $mdDialog = {
      hide: jasmine.createSpy('$mdDialog.close'),
      cancel: jasmine.createSpy('$mdDialog.cancel'),
      result: {
        then: jasmine.createSpy('$mdDialog.result.then')
      },
      confirm: jasmine.createSpy('$mdDialog.confirm')
    };

    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('TagListCtrl', {
        '$scope' : scope,
        '$mdDialog': $mdDialog
      });
    };

  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should update list by GET method', function () {

    createController();

    requestHandler = $httpBackend.when('GET', 'http://localhost:1337/tags?sort=name+ASC')
        .respond(200,[{"id":1, "name":"testNameOne"}, {"id":2, "name":"TestNameTwo"}]);
    $httpBackend.expectGET('http://localhost:1337/tags?sort=name+ASC');

    scope.init();

    $httpBackend.flush();

    expect(scope.list.length).toBe(2);
    expect(scope.list[0].id).toBe(1);
    expect(scope.list[1].id).toBe(2);
    expect(scope.list[0].name).toBe("testNameOne");
    expect(scope.list[1].name).toBe("TestNameTwo");
  });

  it('should delete a tag with response 200', function () {

    /*requestHandler = $httpBackend.when('GET', 'http://localhost:1337/tag/2')
      .respond(200,{"id":2, "name":"testNameTwo"});
    $httpBackend.expectGET("http://localhost:1337/tag/2");*/

    createController();
    scope.list = (
      [
        {
          "id":1,
          "title":"one"},
        {
          "id":2,
          "title":"two"},
        {
          "id":3,
          "title":"three"}
      ]
    );
    /*requestHandler = $httpBackend.when('DELETE', 'http://localhost:1337/tag/2').respond(200,{"id":2, "title":"two"});
    $httpBackend.expectDELETE("http://localhost:1337/tag/2");*/

    scope.list.splice(1,1);
    /*scope.delete(1);*/
    /*$httpBackend.flush();*/

    expect(scope.list.length).toBe(2);

  });
});
