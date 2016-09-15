'use strict';

var async = require('async'),
		mysql = require('mysql'),
		config = require('./../config/connections').connections,
		connection = {};

module.exports = {
	getAll: function(callback){

		var dbAdapter = {};

		if(typeof sails !== 'undefined'){
			sails.config.environment === 'production'
					? dbAdapter = config.mysql_production
					: dbAdapter = config.mysql_local;
		}else {
			dbAdapter = config.mysql_local;
		}

		dbAdapter.multipleStatements = true;

		connection = mysql.createConnection(dbAdapter);

		connection.connect();

		connection.query(
				'SELECT * FROM projectsetting; ' +
				'SELECT * FROM authentication WHERE active = true; ' +
				'SELECT * FROM definition d INNER JOIN property p ON d.id = p.definition ORDER BY d.id; ' +
				'SELECT * FROM method m INNER JOIN path p ON m.path = p.id INNER JOIN response r ON m.id = r.method WHERE testActive = true; ',
				[1, 2, 3, 4],
				function(err, data){
					if(err) throw err;

					var settingData = data[0],
							authenticationData = data[1],
							propertiesData = data[2],
							methodData = data[3];

					var host = settingData[0].testHost;

					var authentication = {};

					authenticationData.forEach(function(auth){
						authentication[auth.key] = auth.value;
					});

					var testObjects = [];

					methodData.forEach(function(method){

						var testObject = {};

						testObject = {
							request: {
								host: host,
								auth: authentication,
								path: method.title,
								method: method.name
							},
							response: {
								statusCode: method.index,
								consumes: method.consumes,
								produces: method.produces,
								properties: []
							}
						};

						propertiesData.forEach(function(property){
							if(method.type === '$ref' && property.definition === method.$ref) {
								testObject.response.properties.push(property);
								propertiesData.splice(propertiesData.indexOf(property), 1);
							}
						});
						testObjects.push(testObject);
					});
					callback(testObjects);
				}
		);
		connection.end();
	},

	getOne: function(response){

	}
};
