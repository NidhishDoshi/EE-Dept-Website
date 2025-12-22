// Fuzzy Search Controller

module.exports = {
  async search(ctx) {
    const { query } = ctx.request.query;
    if (!query || typeof query !== "string" || !query.trim()) {
      ctx.throw(400, "A valid search query must be provided.");
    }

    // Example: Search across multiple models (people, news, research, etc.)
    // You should replace this with actual fuzzy search logic and models
    const results = {};

    // Example: Search People
    results.peoples = await strapi.entityService.findMany(
      "api::people.people",
      {
        filters: {
          Name: { $containsi: query },
        },
        limit: 10,
      }
    );

    // Example: Search News
    results.news = await strapi.entityService.findMany("api::news.news", {
      filters: {
        Title: { $containsi: query },
      },
      limit: 10,
    });

    // Example: Search Research Projects
    results.research = await strapi.entityService.findMany(
      "api::research-project.research-project",
      {
        filters: {
          Title: { $containsi: query },
        },
        limit: 10,
      }
    );

    // Add more models as needed

    ctx.send(results);
  },
};
