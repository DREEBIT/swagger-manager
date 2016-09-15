'use strict';

var _ = require('underscore'),
		helper = require('./helper.js'),
		chai = require('chai'),
		chaiHttp = require('chai-http'),
		expect = chai.expect,
		assert = chai.assert,
		Test = require('mocha').Test,
		should = require('should');

chai.use(chaiHttp);

var env = {
	host : 'http://demo.vsm.dreebitnet.local/'
};

exports.generateTests = function(suiteInstance, callback) {

	helper.getAll(function(testObjects){

		if(testObjects.length === 0) {
			callback('No automated tests found!');
		} else {
			testObjects.forEach(function(test, count){

				if(test.request.method === 'GET') {
					getCase(suiteInstance, test);

				}else if(test.request.method === 'POST') {
					postCase(suiteInstance, test);

				}else if(test.request.method === 'PUT') {
					putCase(suiteInstance, test);

				}else if(test.request.method === 'DELETE') {
					deleteCase(suiteInstance, test);
				}
			});
			callback();
		}
	});
};

/*************
* Test-Cases *
*************/

var getCase = function(suiteInstance,  test){

	suiteInstance.addTest(new Test('Should ' + test.request.method + ' ' + test.request.path + ' with response ' + test.response.statusCode,
			function(done){

				chai.request(test.request.host)
						.get(test.request.path)
						//.query({name: 'foo', limit: 10}) // /search?name=foo&limit=10
						.set(test.request.auth)
						.end(function(err, res) {

							expectStatusCode(test.response.statusCode, res);

							expectContentTypes(test.response.consumes, res.headers);

							expectContentTypes(test.response.produces, res.headers);

							//expectBodyIsArray(t.response.isArray, res.body[t.response.$ref]);
							// expect array or object
							/*if (t.response.isArray == true){
							 assert.isArray(res.body[t.response.$ref]);
							 }else{
							 assert.isNotArray(res);
							 }*/


							expectKeysInBody(test.response.properties, res.body);

							/*if(t.response.type === 'string') {
								console.log(t.response.type + 'should be string');
								assert.isString(res.body);

							}else if(t.response.type === 'boolean'){
								console.log(t.response.type + 'should be boolean');
								assert.isBoolean(res.body);

							}else if(t.response.type === 'integer'){
								console.log(t.response.type + 'should be integer');
								assert.isNumber(res.body);

							}else if(t.response.type === '$ref' && t.response.$ref !== null){
								console.log(t.response.type);
								if(_.has(res.body, 'total')){
									/!*console.log('Expected-Type:' + t.response.type);
									console.log('if total');*!/
									expect(res.body.total).to.equal(res.body.news.length);
								}
							}*/

							//console.log(t.response.$ref);
							//expectKeys();
							//expectKeyTypes();

							done();
						});
			})
	)
};

var postCase = function(){
	console.log('To implement post test');
};
var putCase = function(){
	console.log('To implement put test');
};
var deleteCase = function(){
	console.log('To implement delete test');
};

/*********************
* Validate-Functions *
*********************/

var expectStatusCode = function(expectIndex, response){
	if(expectIndex) expect(response).to.have.status(expectIndex);
};

var expectContentTypes = function(expectFormat, headers){
	if (expectFormat){
		var formats = JSON.parse(expectFormat),
			count = 0;

		for(var i = 0; i < formats.length; i++) {
			if (headers['content-type'].indexOf(formats[i]) != -1) {
				assert.include(headers['content-type'], formats[i]);
			}else{
				count += 1;
			}
		}
		if(formats.length === count){
			assert.include(headers['content-type'], formats[0], 'Response header doesn´t match content-type');
		}
	}else{
		assert.isDefined(headers['content-type'], 'No header field \'content-type\'');
	}
};

var expectKeysInBody = function(propertiesToExpect, body){
	propertiesToExpect.forEach(function(property){
		expect(body).to.have.any.keys(property.key);
	});
};

var expectKeyTypesInBody = function(propertiesToExpect, body){
	propertiesToExpect.forEach(function(property){
		expect(body).to.have.any.keys(property.key);
	});
};
