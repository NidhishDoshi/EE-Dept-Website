'use strict';

/**
 * contact-point service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::contact-point.contact-point');
