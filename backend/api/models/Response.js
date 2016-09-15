/**
 * Response.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
	attributes: {
		method: {
			model: 'Method'
		},
		index: {
			type: 'integer'
		},
		type: {
			type: 'string'
		},
		$ref: {
			model: 'Definition'
		},
		isArray: {
			type: 'boolean'
		},
		description: {
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
