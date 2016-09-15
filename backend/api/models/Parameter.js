/**
 * Parameter.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
	attributes: {
		method: {
			model: 'Method'
		},
		name: {
			type: 'string'
		},
		in: {
			type: 'string'
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
		createdAt: {
			type: 'datetime'
		},
		updatedAt: {
			type: 'datetime'
		}
	}
};

