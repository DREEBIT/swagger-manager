'use strict';

var Mocha = require('mocha'),
	factory = require('./spec'),
	mocha = new Mocha({
		reporter: 'mocha-junit-reporter',
		reporterOptions: {
			mochaFile: './test-results.xml'
		}
	}),
	suiteInstance = Mocha.Suite.create(mocha.suite, 'API Test Suite');

factory.generateTests(suiteInstance, function(err){

	mocha.run()
		.on('test', function(test) {
			console.log('Test started: ' + test.title);
		})
		.on('test end', function(test) {
			console.log('Test done: ' + test.title + '\n');
		})
		.on('pass', function(test) {
			console.log('Test passed: ' + test.title);
		})
		.on('fail', function(test, err) {
			console.log('Test failed');
			console.log(err);
		})
		.on('end', function() {
			console.log('Finished! All tests done!');
		});
});

