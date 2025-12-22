module.exports = ({ env }) => ({
  upload: {
    config: {
      // provider: "cloudinary",
      provider: "local",
      providerOptions: {
        //   cloud_name: env('CLOUDINARY_NAME'),
        //   api_key: env('CLOUDINARY_KEY'),
        //   api_secret: env('CLOUDINARY_SECRET'),
        // },
        // actionOptions: {
        //   upload: {},
        //   uploadStream: {},
        //   delete: {},
        // }}},
        sizeLimit: 10000000, // 10MB
      },
    },
  },

  // Cloudinary config (uncomment for production)
  // upload: {
  //   config: {
  //     provider: 'cloudinary',
  //     providerOptions: {
  //       cloud_name: env('CLOUDINARY_NAME'),
  //       api_key: env('CLOUDINARY_KEY'),
  //       api_secret: env('CLOUDINARY_SECRET'),
  //     },
  //     actionOptions: {
  //       upload: {},
  //       uploadStream: {},
  //       delete: {},
  //     }
  //   }
  // },

  // "fuzzy-search": {
  //   enabled: true,
  //   config: {
  //     contentTypes: [
  //       {
  //         uid: 'api::people.people',
  //         modelName: 'people',
  //         fuzzysortOptions: {
  //           characterLimit: 300,
  //           threshold: 0.6,
  //           limit: 10,
  //           keys: [
  //             { name: 'Name', weight: 0.2 },
  //             { name: 'Designation', weight: 0.1 },
  //           ],
  //         },
  //       },
  //       {
  //         uid: 'api::research-lab.research-lab',
  //         modelName: 'research-lab',
  //         fuzzysortOptions: {
  //           characterLimit: 300,
  //           threshold: 0.6,
  //           limit: 10,
  //           keys: [
  //             { name: 'Name', weight: 0.3 },
  //             { name: 'Type', weight: 0.1 },
  //             { name: 'Link', weight: 0.1 }
  //           ],
  //         },
  //       },
  //       {
  //         uid: 'api::research-project.research-project',
  //         modelName: 'research-project',
  //         fuzzysortOptions: {
  //           characterLimit: 300,
  //           threshold: 0.6,
  //           limit: 10,
  //           keys: [
  //             { name: 'Title', weight: 0.3 },
  //             { name: 'Area', weight: 0.1 },
  //             { name: 'PI', weight: 0.1 },
  //             { name: 'Type', weight: 0.1 },
  //             { name: 'Duration', weight: 0.1 },
  //             { name: 'CoPI', weight: 0.1 },
  //             { name: 'CurrentStatus', weight: 0.1 },
  //           ],
  //         },
  //       },

  //       {
  //         uid: 'api::about-page.about-page',
  //         modelName: 'about-page',
  //         fuzzysortOptions: {
  //           characterLimit: 300,
  //           threshold: 0.6,
  //           limit: 10,
  //           keys: [
  //             { name: 'Title', weight: 0.2 },
  //             { name: 'Description', weight: 0.1 },
  //           ],
  //         },
  //       }
  //     ],
  //   },
  // },
});
