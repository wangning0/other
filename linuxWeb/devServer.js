/* eslint no-console:0 */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = require('./webpack/client');
const runServer = require('./dist/server').runServer;

new WebpackDevServer(webpack(config), config.devServer)
  .listen(config.devServer.port, 'localhost', (err) => {
    if (err) {
      console.log(err);
    }
    console.log('==> ✅  Static file@localhost:' + config.devServer.port);
    runServer();
  });

