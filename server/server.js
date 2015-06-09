var util = require('util');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');

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

  app.use(express.static('public'));

  return app;
}

//
