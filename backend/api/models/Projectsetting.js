/**
 * Projectsetting.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
	attributes: {
		swagger: {
			type: 'string'
		},
		host: {
			type: 'string'
		},
		testHost: {
			type: 'string'
		},
		basePath: {
			type: 'string'
		},
		schemes: {
			type: 'string'
		},
		linkSwaggerUi: {
			type: 'string'
		},
		title: {
			type: 'string'
		},
		description: {
			type: 'string'
		},
		version: {
			type: 'string'
		},
		termsOfService: {
			type: 'string'
		},
		contactName: {
			type: 'string'
		},
		contactUrl: {
			type: 'string'
		},
		contactEmail: {
			type: 'email'
		},
		licenceName: {
			type: 'string'
		},
		licenceUrl: {
			type: 'string'
		},
		externalDocsUrl: {
			type: 'string'
		},
		externalDocsDescription: {
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

