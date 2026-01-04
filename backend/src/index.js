'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    // Register custom routes for Google Sheets integration
    const { getAboutData } = require('./controllers/aboutController');
    const { getNews } = require('./controllers/newsController');
    const { getPeople } = require('./controllers/peopleController');
    const { getTalksEvents } = require('./controllers/talksEventsController');
    const { getResearchProjects } = require('./controllers/researchProjectsController');
    const { getResearchLabs } = require('./controllers/researchLabsController');
    const { getGallery } = require('./controllers/galleryController');
    const { getCarousel } = require('./controllers/carouselController');
    const { getFAQ } = require('./controllers/faqController');
    const { getContactPoints } = require('./controllers/contactPointsController');
    const { getStatistics } = require('./controllers/statisticsController');
    
    strapi.server.routes([
      {
        method: 'GET',
        path: '/api/about',
        handler: async (ctx) => {
          try {
            const result = await getAboutData();
            ctx.body = result;
          } catch (error) {
            ctx.status = 500;
            ctx.body = {
              success: false,
              error: error.message,
            };
          }
        },
        config: {
          policies: [],
          middlewares: [],
          auth: false,
        },
      },
      {
        method: 'GET',
        path: '/api/news-sheets',
        handler: async (ctx) => {
          try {
            const result = await getNews();
            ctx.body = result;
          } catch (error) {
            ctx.status = 500;
            ctx.body = {
              success: false,
              error: error.message,
            };
          }
        },
        config: {
          policies: [],
          middlewares: [],
          auth: false,
        },
      },
      {
        method: 'GET',
        path: '/api/people-sheets',
        handler: async (ctx) => {
          try {
            const result = await getPeople();
            ctx.body = result;
          } catch (error) {
            ctx.status = 500;
            ctx.body = {
              success: false,
              error: error.message,
            };
          }
        },
        config: {
          policies: [],
          middlewares: [],
          auth: false,
        },
      },
      {
        method: 'GET',
        path: '/api/talks-events-sheets',
        handler: async (ctx) => {
          try {
            const result = await getTalksEvents();
            ctx.body = result;
          } catch (error) {
            ctx.status = 500;
            ctx.body = {
              success: false,
              error: error.message,
            };
          }
        },
        config: {
          policies: [],
          middlewares: [],
          auth: false,
        },
      },
      {
        method: 'GET',
        path: '/api/research-projects-sheets',
        handler: async (ctx) => {
          try {
            const result = await getResearchProjects();
            ctx.body = result;
          } catch (error) {
            ctx.status = 500;
            ctx.body = {
              success: false,
              error: error.message,
            };
          }
        },
        config: {
          policies: [],
          middlewares: [],
          auth: false,
        },
      },
      {
        method: 'GET',
        path: '/api/research-labs-sheets',
        handler: async (ctx) => {
          try {
            const result = await getResearchLabs();
            ctx.body = result;
          } catch (error) {
            ctx.status = 500;
            ctx.body = {
              success: false,
              error: error.message,
            };
          }
        },
        config: {
          policies: [],
          middlewares: [],
          auth: false,
        },
      },
      {
        method: 'GET',
        path: '/api/gallery-sheets',
        handler: async (ctx) => {
          try {
            const result = await getGallery();
            ctx.body = result;
          } catch (error) {
            ctx.status = 500;
            ctx.body = {
              success: false,
              error: error.message,
            };
          }
        },
        config: {
          policies: [],
          middlewares: [],
          auth: false,
        },
      },
      {
        method: 'GET',
        path: '/api/carousel-sheets',
        handler: async (ctx) => {
          try {
            const result = await getCarousel();
            ctx.body = result;
          } catch (error) {
            ctx.status = 500;
            ctx.body = {
              success: false,
              error: error.message,
            };
          }
        },
        config: {
          policies: [],
          middlewares: [],
          auth: false,
        },
      },
      {
        method: 'GET',
        path: '/api/faq-sheets',
        handler: async (ctx) => {
          try {
            const result = await getFAQ();
            ctx.body = result;
          } catch (error) {
            ctx.status = 500;
            ctx.body = {
              success: false,
              error: error.message,
            };
          }
        },
        config: {
          policies: [],
          middlewares: [],
          auth: false,
        },
      },
      {
        method: 'GET',
        path: '/api/contact-points-sheets',
        handler: async (ctx) => {
          try {
            const result = await getContactPoints();
            ctx.body = result;
          } catch (error) {
            ctx.status = 500;
            ctx.body = {
              success: false,
              error: error.message,
            };
          }
        },
        config: {
          policies: [],
          middlewares: [],
          auth: false,
        },
      },
      {
        method: 'GET',
        path: '/api/statistics-sheets',
        handler: async (ctx) => {
          try {
            const result = await getStatistics();
            ctx.body = result;
          } catch (error) {
            ctx.status = 500;
            ctx.body = {
              success: false,
              error: error.message,
            };
          }
        },
        config: {
          policies: [],
          middlewares: [],
          auth: false,
        },
      },
    ]);
  },
};
