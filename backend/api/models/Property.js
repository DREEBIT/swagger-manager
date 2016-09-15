/**
 * Property.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
	attributes: {
		definition: {
			model: 'Definition'
		},
		key: {
			type: 'string'
		},
		type: {
			type: 'string'
		},
		$ref: {
			model: 'Definition'
		},
		format: {
			type: 'string'
		},
		default: {
			type: 'boolean'
		},
		isArray: {
			type: 'boolean'
		},
		description: {
			type: 'string'
		},
		required: {
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

