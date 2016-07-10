const webpack = require('webpack');
const path = require('path');

const baseConfig = require('./base');

const config = Object.assign({}, baseConfig, {
  target: 'node',
  devtool: 'cheap-module-eval-source-map',
  entry: ['babel-polyfill', path.join(__dirname, '/../src/server/index')],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  externals: [
    function filter(context, request, cb) {
      const isExternal = request.match(/^[@a-z][a-z\/\.\-0-9]*$/i)
            && !request.match(/^(actions|components|constants|containers|images|reducers|server|sources|store|routes|utils)/)
            && !request.match(/^babel-polyfill/)
            && !context.match(/[\\/]babel-polyfill/)
            && !request.match(/handsontable\.full/)
      cb(null, Boolean(isExternal));
    },
  ],
});

const srcPath = path.join(__dirname, '/../src');
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: srcPath,
});

if (process.env.NODE_ENV === 'development') {
  config.cache = true;
  config.debug = true;

  config.entry.unshift(
    'webpack/hot/poll?1000'
  );

  config.plugins.push(...[
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
      __CLIENT__: false,
      __SERVER__: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]);
} else {
  config.plugins.push(...[
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      __CLIENT__: false,
      __SERVER__: true,
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
  ]);
}

module.exports = config;
