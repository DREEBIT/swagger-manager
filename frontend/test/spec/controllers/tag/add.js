'use strict';

describe('Controller: TagAddCtrl', function () {

  // load the controller's module
  beforeEach(module('amApp'));
  beforeEach(module('templates'));

  var createController,
    scope,
    $rootScope,
    $mdDialog,
    $httpBackend,
    $controller;

  beforeEach(inject(function ($injector) {

    $rootScope = $injector.get('$rootScope');

    scope = $rootScope.$new();

    $httpBackend = $injector.get('$httpBackend');

    $controller = $injector.get('$controller');

    $mdDialog = {
      hide: jasmine.createSpy('$mdDialog.close'),
      cancel: jasmine.createSpy('$mdDialog.dismiss'),
      result: {
        then: jasmine.createSpy('$mdDialog.result.then')
      }
    };

    createController = function(MockTagList){
      return $controller('TagListCtrl',{
        '$scope' : scope,
        '$mdDialog' : $mdDialog,
        'tagList' : MockTagList
      });
    };
  }));

  it('should attach a list of awesomeThings to the scope', function () {

  });

});
