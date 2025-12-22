const { mergeConfig } = require('vite');

module.exports = (config) => {
  // Important: always return the modified config
  return mergeConfig(config, {
    server: {
      allowedHosts: [
        'localhost',
        '127.0.0.1',
        'ee.iitdh.ac.in',
      ]
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  });
};
