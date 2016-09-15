/**
 * Created by stefanmeschke on 15.07.15.
 */
/**
 * ExportController
 *
 * @description :: Server-side logic for managing exports
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs'),
	path = require('path'),
	_ = require('underscore'),
	_s = require('underscore.string');

var EXPORT_FILE_PATH = path.join(__dirname, '../../', 'assets/exports');

module.exports = {

	export: function (req, res) {
		var me = this,
			response = new Object(),
			today = new Date(),
			todayISO = today.toISOString(),
			linkpath = 'exports',
			filepath = 'assets/exports',
			filename = 'swagger-' + todayISO,
			extension = 'json',
			jsonStringToWrite = {},
			link = '';

		filename = filename.replace(/\:/g, '-');
		filename = filename.replace(/\./g, '-');

		link = sails.getBaseurl() + '/' + path.join(linkpath, filename + '.' + extension);

		response = {
			link: link,
			filename: filename + '.' + extension,
			createdAt: todayISO
		};

		Definition.find().then(function (definitions) {
			var d = definitions;

			var p = Path.find().then(function (paths) {
				return paths;
			});
			var m = Method.find().then(function (methods) {
				return methods;
			});
			var t = Tag.find().then(function (tags) {
				return tags;
			});
			var i = Projectsetting.find(1).then(function (information) {
				return information[0];
			});

			return [d, p, m, t, i];
		}).spread(function (d, p, m, t, i) {
			jsonStringToWrite = me.getSwaggerJsonTemplate(i);
			jsonStringToWrite.definitions = me.getDefinitionsFromArray(d);
			jsonStringToWrite.paths = me.getPathsFromArray(p, m);
			jsonStringToWrite.tags = me.getTagsFromArray(t);

			fs.writeFile(path.join(EXPORT_FILE_PATH, filename + '.' + extension), JSON.stringify(jsonStringToWrite, 4), function (err) {
				if (err) {
					response = {};
					response.message = 'Something went wrong!';
					res.send(response);
					return;
				}

				res.send(response);
			});

		}).fail(function (err) {

			response = {};
			response.message = 'Something went wrong!';
			response.error = err;
			res.send(response);

		});
	},

	json: function (req, res) {
		var me = this,
			response = {};

		if (req.query.cache === 'true') {
			fs.readFile(path.join(EXPORT_FILE_PATH, me.getMostRecentFileName(EXPORT_FILE_PATH)), 'utf8', function (err, data) {
				if (err) {
					response = {};
					response.message = 'Something went wrong!';
					res.send(response);
					return;
				}

				res.send(data);
			});
		} else {
			Definition.find().populateAll().then(function (definitions) {


				var methods = Method.find().populateAll().then(function (methods) {
					return methods;
				});

				var paths = Path.find().populateAll().then(function (paths) {
					return paths;
				});

				var properties = Property.find().populateAll().then(function (properties) {
					return properties;
				});

				var parameters = Parameter.find().populateAll().then(function (parameters) {
					return parameters;
				});

				var responses = Response.find().populateAll().then(function (responses) {
					return responses;
				});

				var tags = Tag.find().populateAll().then(function (tags) {
					return tags;
				});

				var information = Projectsetting.find(1).then(function (information) {
					return information[0];
				});

				return [
					definitions,
					paths,
					methods,
					properties,
					parameters,
					responses,
					tags,
					information
				];

			}).spread(function (definitions,
								paths,
								methods,
								properties,
								parameters,
								responses,
								tags,
								information) {
				response = me.getSwaggerJsonTemplate(information);

				response.definitions = me.getDefinitionsFromArray(definitions);

				response.paths = me.getPathsFromArray(paths, methods, parameters, responses, definitions);

				response.tags = me.getTagsFromArray(tags);

				res.send(response);

			}).fail(function (err) {
				response = {};
				response.message = 'Something went wrong!';
				response.error = err;
				res.send(response);

			});
		}
	},

	getTagsFromArray: function (allTags) {
		var me = this,
			tags = [];

		allTags.forEach(function (tag) {
			tags.push({
				name: tag.name,
				description: tag.description || '',
				externalDocs: {
					description: tag.externalDocsDescription || '',
					url: tag.externalDocsUrl || ''
				}
			});
		});

		return tags;
	},

	getPathsFromArray: function (allPaths, allMethods, allParameters, allResponses, allDefinitions, allTags) {
		var me = this,
			paths = {};

		if (allPaths) {
			allPaths.forEach(function (path) {
				var title = '';

				if (_s.startsWith(path.title, '/')) {
					title = path.title;
				} else {
					title = '/' + path.title;
				}

				paths[title] = {};

				path.methods.forEach(function (m) {
					allMethods.forEach(function (method) {
						if (m.id === method.id) {
							var name = method.name.toLowerCase(),
								tags = [];

							if (_.isArray(method.tags) && method.tags.length) {
								method.tags.forEach(function (tag) {
									tags.push(tag.name);
								});
							}

							paths[title][name] = {
								tags: tags,
								description: method.description || '',
								consumes: method.consumes,
								produces: method.produces,
								parameters: me.getMethodParametersFromArray(method.parameters, allParameters, allDefinitions),
								responses: me.getMethodResponsesFromArray(method.responses, allResponses, allDefinitions)
							}
						}
					});
				});
			});
		}

		return paths;
	},

	getMethodParametersFromArray: function (p, allParameters, allDefinitions) {
		var me = this,
			parameters = [];

		p.forEach(function (parameter) {
			var p = {
				in: parameter.in || '',
				name: parameter.name || '',
				description: parameter.description || '',
				required: parameter.required || false
			};

			if (parameter.isArray && parameter.isArray === true) {
				if (parameter.type === '$ref') {

					allParameters.forEach(function (ap) {
						if (parameter.id === ap.id) {
							p.schema = {
								type: 'array',
								items: {
									$ref: '#/definitions/' + ap.$ref.title
								}
							};
						}
					});


				} else {
					p.type = 'array';
					p.items = {
						type: parameter.type
					};
				}

			} else if (parameter.type === '$ref') {
				console.log(parameter);

				allParameters.forEach(function (ap) {
					if (parameter.id === ap.id) {
						p.schema = {
							$ref: '#/definitions/' + ap.$ref.title
						}
					}
				});


			} else {
				p.type = parameter.type;
			}

			parameters.push(p);
		});

		return parameters;
	},

	getMethodResponsesFromArray: function (r, allResponsens, allDefinitions) {
		var me = this,
			responses = {};

		r.forEach(function (response) {
			responses[response.index] = {
				description: response.description || ""
			};

			if (response.isArray && response.isArray === true) {
				responses[response.index]['schema'] = {
					type: 'array',
					items: {}
				};

				if (response.type === '$ref') {

					allResponsens.forEach(function (r) {
						if (response.id === r.id) {
							responses[response.index].schema.items = {
								$ref: '#/definitions/' + r.$ref.title
							}
						}
					});

				} else {
					responses[response.index].schema.items = {
						type: response.type
					}
				}

			} else if (response.type === '$ref') {

				allResponsens.forEach(function (r) {
					if (response.id === r.id) {
						responses[response.index]['schema'] = {
							$ref: '#/definitions/' + r.$ref.title
						}
					}
				});
			} else {
				responses[response.index]['schema'] = {
					type: response.type
				}
			}

		});

		return responses;
	},

	getDefinitionsFromArray: function (allDefinitions) {
		var me = this,
			definitions = {};

		if (allDefinitions) {
			allDefinitions.forEach(function (definition) {
				if (definition) {
					definitions[definition.title] = {};
					definitions[definition.title].description = definition.description || "";
					definitions[definition.title].required = me.getRequiredFromDefinition([], definition, allDefinitions);
					definitions[definition.title].properties = me.getPropertiesFromDefinition({}, definition, allDefinitions);
				}
			});
		}

		return definitions;
	},

	getRequiredFromDefinition: function (required, definition, allDefinitions) {
		var me = this;

		if (definition.extends) {
			allDefinitions.forEach(function (d) {
				if (d.id === definition.extends.id) {
					me.getRequiredFromDefinition(required, d, allDefinitions);
				}
			});
		}

		definition.properties.forEach(function (property) {
			if (property.required) {
				required.push(property.key);
			}
		});

		return required;
	},

	getPropertiesFromDefinition: function (properties, definition, allDefinitions) {
		var me = this;

		if (definition.extends) {
			allDefinitions.forEach(function (d) {
				if (d.id === definition.extends.id) {
					me.getPropertiesFromDefinition(properties, d, allDefinitions);
				}
			});
		}

		definition.properties.forEach(function (property) {
			properties[property.key] = {};

			if (property.description) {
				properties[property.key].description = property.description;
			}

			if (property.format) {
				properties[property.key].format = property.format
			}

			if (property.isArray) {
				properties[property.key].type = 'array';
				properties[property.key].items = {};

				me.applyPropertyTypeToObject(properties[property.key].items, property, allDefinitions);
			} else {
				me.applyPropertyTypeToObject(properties[property.key], property, allDefinitions);
			}
		});

		return properties;
	},

	applyPropertyTypeToObject: function (object, property, allDefinitions) {
		if (property.type !== '$ref') {
			object.type = property.type
		} else if (property.type === '$ref') {
			allDefinitions.forEach(function (definition) {
				if (definition.id === property.$ref) {
					object.$ref = '#/definitions/' + definition.title
				}
			});
		}

		return object;
	},

	getSwaggerJsonTemplate: function (information) {
		return {
			swagger: information.swagger || '',
			host: information.host || '',
			basePath: information.basePath || '',
			info: {
				contact: {
					name: information.contactName || '',
					url: information.contactUrl || '',
					email: information.contactEmail || ''
				},
				license: {
					name: information.licenceName || '',
					url: information.licenceUrl || ''
				},
				title: information.title || '',
				description: information.description || '',
				termsOfService: information.termsOfService || '',
				version: information.version || ''
			},
			schemes: [information.schemes] || [],
			paths: {},
			securityDefinitions: {},
			definitions: {},
			externalDocs: {
				description: information.externalDocsDescription || '',
				url: information.externalDocsUrl || ''
			}
		};
	},

	getMostRecentFileName: function (dir) {
		var files = fs.readdirSync(dir);

		return _.max(files, function (f) {
			var fullpath = path.join(dir, f);
			return fs.statSync(fullpath).ctime;
		});
	}
};

