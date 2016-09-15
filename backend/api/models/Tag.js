/**
 * Tag.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
	attributes: {
		name: {
			type: 'string'
		},
		description: {
			type: 'string'
		},
		hasExternalDocs: {
			type: 'boolean'
		},
		externalDocsUrl: {
			type: 'string'
		},
		externalDocsDescription: {
			type: 'string'
		},
		methods: {
			collection: 'Method',
			via: 'tags'
		},
		createdAt: {
			type: 'datetime'
		},
		updatedAt: {
			type: 'datetime'
		}
	}
};

