// Fuzzy Search Route

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/fuzzy-search/search",
      handler: "fuzzy-search.search",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
