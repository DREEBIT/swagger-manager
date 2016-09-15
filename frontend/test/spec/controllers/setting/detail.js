'use strict';

describe('Controller: SettingDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('amApp'));

  var createController,
    $controller,
    requestHandler,
    $httpBackend,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector) {

    $controller = $injector.get('$controller');

    $httpBackend = $injector.get('$httpBackend');

    scope = $injector.get('$rootScope').$new();

    createController = function(){
      return $controller('SettingDetailCtrl',{
        '$scope': scope
      })
    };

  }));

  it('should attach fields to form', function () {
    createController();

    expect(scope.swaggerFormFields).toBeDefined();
  });

  it('TO DO should test get', function(){
    var  mockItem = {
      swagger : '2.0',
      info : 'swagger info mock'
    };

    requestHandler = $httpBackend.when('GET', 'http://localhost:1337/projectsetting/1')
      .respond('200', [
        mockItem
    ]);

    $httpBackend.expectGET('http://localhost:1337/projectsettings/1');

    createController();
/*
    expect(scope.setting.swagger).toBe('2.0');*/
  });

  it('should test save function', function(){

    var  mockItem = {
      swagger : '2.0',
      info : 'swagger info mock',
      put : function(){

      }
    };

    createController();
    scope.setting = mockItem;
    scope.save(scope.setting);
  });


});
