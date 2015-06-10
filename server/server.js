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
  var router = express.Router();


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

  var iso = require('./ng2Engine');
  app.engine('ng2.html', iso.ng2Engine);
  app.set('views', 'server');
  app.set('view engine', 'ng2.html');
  app.set('view options', { doctype: 'html' });

  function ngApp(req, res) {
    res.render('index', {
      // clientOnly: true,
      Params: {
        url: req.url,
        originalUrl: req.originalUrl,
        path: req.path,
        params: req.params,
        query: req.query,
        cookie: req.cookies,
        signedCookies: req.signedCookies
      },
      Component: require('./dist/app/App').App
    });
  }

  router.route('/').get(ngApp);
  app.use(router);

  // Simple middleware to handle get/post
  app.use('/model.json', FalcorExpress.dataSourceRoute(function(req, res) {
      return falcorRouter()
  }));


  app.use(history());
  app.use(express.static('public'));

  return app;
}

//
