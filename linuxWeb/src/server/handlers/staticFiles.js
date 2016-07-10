export default {
  method: 'GET',
  path: '/assets/{filename*}',
  config: {
    handler: {
      file: (request) => {
        let assetsPath = `dist${request.path}`;
        if (process.env.NODE_ENV === 'production') {
          assetsPath = `.${request.path}`;
        }
        return assetsPath;
      },
    },
  },
};
