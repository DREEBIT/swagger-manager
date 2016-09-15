/**
 * Created by SchmidtMa on 13.07.2016.
 */
/**
 * ExportController
 *
 * @description :: Server-side logic for managing tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Mocha = require('mocha'),
    async = require('async'),
    factory = require('./../../apitest/spec');

module.exports = {

  run: function (req, res) {

    var mocha = new Mocha({
          reporter: 'mocha-junit-reporter',
          reporterOptions: {
            mochaFile: './apitest/test-results.xml'
          }
        }),
        suiteInstance = Mocha.Suite.create(mocha.suite, 'API Test Suite');

    async.waterfall([
      function(callback) {

        factory.generateTests(suiteInstance, function (err) {
          if(err) {
            var response = {
              message: 'No tests active!',
              type: 'info',
              info: 'No tests active'
            };

            res.send(response);
          }

          var results = [];

          mocha.run()
              .on('test', function(test) {
                var testResult = {
                  time: new Date(),
                  event: 'Test "' + test.title + '" started.',
                  type: 'info'
                };
                results.push(testResult);
              })
              .on('test end', function(test) {
                var testResult = {
                  time: new Date(),
                  event: 'Test "' + test.title + '" done.',
                  type: 'info'
                };
                results.push(testResult);
              })
              .on('pass', function(test) {
                var testResult = {
                  time: new Date(),
                  event: 'Test "' + test.title + '" passed.',
                  type: 'success'
                };
                results.push(testResult);
              })
              .on('fail', function(test, err) {
                var testResult = {
                  time: new Date(),
                  event: 'Test "' + test.title + '" failed!',
                  type: 'error',
                  error: err
                };
                results.push(testResult);
              })
              .on('end', function () {
                var testResult = {
                  time: new Date(),
                  event: 'Finished! All tests done!',
                  type: 'info'
                };
                results.push(testResult);

                callback(null, results);

              });
        });
      },
      function(arg1, callback) {
        callback(null, arg1);
      }
    ], function (err, result) {

      var response = {
        message: 'All tests done!',
        type: 'success',
        results: result
      };
      res.send(response);
    });
  },

  runSingle: function(){
    console.log('Test run!');
  }
};