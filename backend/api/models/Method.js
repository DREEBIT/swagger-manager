/**
 * Method.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
	attributes: {
		path: {
			model: 'Path'
		},
		tags: {
			collection: 'Tag',
			via: 'methods'
		},
		parameters: {
			collection: 'Parameter',
			via: 'method'
		},
		responses: {
			collection: 'Response',
			via: 'method'
		},
		consumes: {
			type: 'array'
		},
		produces: {
			type: 'array'
		},
		security: {
			type: 'array'
		},
		name: {
			type: 'string'
		},
		description: {
			type: 'string'
		},
		summary: {
			type: 'string'
		},
		operationId: {
			type: 'string'
		},
		testActive: {
			type: 'boolean'
		},
		testCount: {
			type: 'integer'
		},
		testSummary: {
			type: 'string'
		},
		testError: {
			type: 'string'
		},
		createdAt: {
			type: 'datetime'
		},
		updatedAt: {
			type: 'datetime'
		}
	}
};

