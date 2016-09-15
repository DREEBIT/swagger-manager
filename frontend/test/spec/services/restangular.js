'use strict';

describe('Service: restangular', function () {

  // load the service's module
  beforeEach(module('amApp'));

  // instantiate service
  var restangular;

  beforeEach(inject(function ($injector) {

    restangular = $injector.get('Restangular');
  }));

  it('should check if restangular service is defined', function () {
    expect(restangular).toBeDefined();
  });

});
