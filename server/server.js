var util = require('util');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var history = require('connect-history-api-fallback');

var app = express();

var FalcorExpress = require('falcor-express');
var falcorRouter = require('./router');


var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

module.exports = function() {

  // Express App
  var app = express();


  app.use(morgan('dev'));
  app.use(bodyParser.text({ type: 'text/*' }))

  // var server = new WebpackDevServer(webpack(require('../webpack.config')), {
  //   publicPath: '/__build__',
  //   historyApiFallback: true,
  //   inline: true,
  //   quiet: false,
  //   noInfo: false,
  //   stats: { colors: true }
  // });
  // server.app.use(app);


  // Simple middleware to handle get/post
  app.use('/model.json', FalcorExpress.dataSourceRoute(function(req, res) {
      return falcorRouter()
  }));


  app.use(history());
  app.use(express.static('public', {
    maxAge: '2000',
    setHeaders: setCustomCacheControl
  }));

  function setCustomCacheControl(res, path) {
    console.log('path', path);
    if (express.static.mime.lookup(path) === 'text/html') {
      // Custom Cache-Control for HTML files
      res.setHeader('Cache-Control', 'public, max-age=0')
    }
  }

  return app;
}

//
