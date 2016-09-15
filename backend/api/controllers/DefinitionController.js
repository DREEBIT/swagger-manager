/**
 * DefinitionController
 *
 * @description :: Server-side logic for managing definitions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	findOne: function (request, response) {
		Definition
			.findOne({id: request.params.id}).populateAll()
			.then(function (definition) {
				var properties = Property.find().populateAll().then(function (properties) {
					return properties;
				});

				return [definition, properties]
			})
			.spread(function (definition, properties) {
				var j, populatedProperties = [];
				for (j = 0; j < definition.properties.length; j++) {
					var id = definition.properties[j].id;
					populatedProperties.push(_.where(properties, {id: id})[0]);
				}
				definition.properties = populatedProperties;

				response.send(definition);
			});
	}

};

