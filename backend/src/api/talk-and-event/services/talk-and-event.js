'use strict';

/**
 * talk-and-event service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::talk-and-event.talk-and-event');
