const webpack = require('webpack');
const path = require('path');

const baseConfig = require('./base');

const srcPath = path.join(__dirname, '/../src');
const config = Object.assign({}, baseConfig, {
  target: 'web',
  entry: {
    app: ['babel-polyfill', path.join(srcPath, '/app')],
  },
  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
    publicPath: '/assets/',
  },
});


if (process.env.NODE_ENV === 'development') {
  const hostname = process.env.HOST || 'localhost';
  const port = process.env.CLIENT_PORT || 8080;

  config.cache = true;
  config.debug = true;
  config.devtool = 'cheap-module-eval-source-map';

  Object.keys(config.entry).forEach(k => {
    config.entry[k].unshift(
      `webpack-dev-server/client?http://${hostname}:${port}`,
      'webpack/hot/only-dev-server'
    );
  });

  config.output.publicPath = `http://${hostname}:${port}/assets/`;
  config.output.hotUpdateMainFilename = 'update/[hash]/update.json';
  config.output.hotUpdateChunkFilename = 'update/[hash]/[id].update.js';

  config.plugins.push(...[
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
      __CLIENT__: true,
      __SERVER__: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]);

  config.historyApiFallback = false;
  config.devServer = {
    port,
    host: hostname,
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    hot: true,
    inline: false,
    lazy: false,
    noInfo: false,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true },
  };

  config.module.loaders.push({
    test: /\.(js|jsx)$/,
    loader: 'react-hot!babel',
    include: srcPath,
  });
} else {
  config.plugins.push(...[
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      __CLIENT__: true,
      __SERVER__: false,
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
  ]);
  config.module.loaders.push({
    test: /\.(js|jsx)$/,
    loader: 'babel',
    include: srcPath,
  });
}

module.exports = config;
