"use strict";

/**
 * department-statistic service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "api::department-statistic.department-statistic"
);
