'use strict';

describe('Service: FormatService', function () {

  // load the service's module
  beforeEach(module('amApp'));

  // instantiate service
  var FormatService;
  beforeEach(inject(function (_FormatService_) {
    FormatService = _FormatService_;
  }));

  it('should do something', function () {
    expect(!!FormatService).toBe(true);
  });

});
