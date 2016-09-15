/**
 * Created by SchmidtMa on 30.08.2016.
 */
var chai = require('chai'),
	chaiHttp = require('chai-http'),
	Mocha = require('mocha'),
	mocha = new Mocha({
		reporter: 'mocha-junit-reporter',
		reporterOptions: {
			mochaFile: './singleTest/test-results.xml'
		}
	}),
	suiteInstance = Mocha.Suite.create(mocha.suite, 'API Test Suite');

chai.use(chaiHttp);

var auth =  {
	'X-VSM-AUTH-TOKEN': '65ip6manb2oyctt5kfhdyruo5h0',
	'X-VSM-AUTH-UUID': 'Test'
};

var mochaTest = function(suiteInstance, callback) {
		suiteInstance.addTest(new Mocha.Test('Should GET /rest/news with Status 200',
			function(done){
				chai.request('http://demo.vsm.dreebitnet.local')
					.get('/rest/news')
					.set(auth)
					.end(function(err, res) {
						chai.expect(res).to.have.status(200);
						done();
					});
				})
	);
	callback();
};

mochaTest(suiteInstance, function(err){
	mocha.run()
		.on('pass', function() {
			console.log('Test passed');
		})
		.on('fail', function(err) {
			console.log('Test failed');
			console.log(err);
		})
});
