/**
 * MethodController
 *
 * @description :: Server-side logic for managing methods
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	findOne: function (request, response) {
		Method
			.findOne({id: request.params.id}).populateAll()
			.then(function (method) {
				var parameters = Parameter.find().populateAll().then(function (parameters) {
					return parameters;
				});
				var responses = Response.find().populateAll().then(function (responses) {
					return responses;
				});

				return [method, parameters, responses]
			})
			.spread(function (method, parameters, responses) {
				var j, populatedParameters = [], populatedResponses = [];

				for (j = 0; j < method.parameters.length; j++) {
					var id = method.parameters[j].id;
					populatedParameters.push(_.where(parameters, {id: id})[0]);
				}
				method.parameters = populatedParameters;

				for (j = 0; j < method.responses.length; j++) {
					var id = method.responses[j].id;
					populatedResponses.push(_.where(responses, {id: id})[0]);
				}
				method.responses = populatedResponses;

				response.send(method);
			});
	}
};

