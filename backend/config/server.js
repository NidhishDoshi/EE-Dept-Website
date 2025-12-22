module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  // url: env('URL', 'https://ee.iitdh.ac.in/strapi'),
  // admin: {
  //   path: '/strapi/admin',
  //   url: 'https://ee.iitdh.ac.in/strapi/admin', // Explicitly set admin URL
  // },
  url: env("URL", "http://localhost:1337"),
  app: {
    keys: env.array("APP_KEYS"),
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
});
