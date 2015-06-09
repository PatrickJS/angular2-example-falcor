var webpack = require('webpack');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require('path');
var sliceArgs = Function.prototype.call.bind(Array.prototype.slice);
var path = require('path');

module.exports = {
  // devtool: 'source-map',
  devtool: 'eval',

  devServer: {
    inline: true,
    colors: true,
    historyApiFallback: true,
    contentBase: 'public',
    publicPath: '/__build__'
  },

  debug: true,
  cache: false,

  context: __dirname,

  entry: {
    angular2: [
      // Angular 2 Deps
      'zone.js',
      // 'zone.js/lib/browser/zone-microtask.js',
      // 'zone.js/dist/zone-microtask.min.js',
      // 'zone.js/dist/zone-microtask.js',
      // 'zone.js/dist/long-stack-trace-zone.js',

      'reflect-metadata',
      'rtts_assert/rtts_assert',

      './src/common/BrowserDomAdapter',

      'angular2/angular2',
      'angular2/router',
      'angular2/di',
      'angular2/src/facade/browser'
    ],
    app: [
      // App
      // 'webpack-dev-server/client?http://localhost:8080',
      // 'webpack/hot/dev-server',
      './src/bootstrap'
    ]
  },
  output: {
    path: path.join(__dirname, 'public', '__build__'),
    filename: '[name].js',
    // filename: '[name].[hash].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
    // publicPath: 'http://mycdn.com/'
  },


  stats: {
    colors: true,
    reasons: true
  },



  resolve: {
    root: __dirname,
    extensions: [ '', '.js', '.ts', /*'.es6',*/'.json', '.webpack.js', '.web.js'],
    // Todo: learn more about alias
    alias: {
      // When Angular2 has a TypeScript build
      'falcor-observable': 'rx',
      // 'falcor': 'falcor/dist/falcor.browser.js',
      'components': 'src/app/components',

      'app': 'src/app',
      'common': 'src/common',
      'patch_angular2': 'src/patch_angular2',
      'falcor-angular': 'src/dev_modules/falcor-angular',
    },
    modulesDirectories: [
      'web_modules',
      'node_modules'
    ]
  },

  module: {
    loaders: [
      // Support for *.json files.
      { test: /\.json$/,                    loader: 'json' },
      // Support for CSS
      { test: /\.css$/,                     loader: 'raw' },
      // Copy all assets in to asset folder (use hash filename)
      { test: /\.(png|jpg|gif|woff|eot|ttf|svg)$/, loader: 'file?name=assets/[hash].[ext]' },
      // Copy all .html as static file (keep filename)
      // { test: /index[a-z-]*\.html$/,        loader: 'file?name=[path][ ].html&context=./src' },
      // support for .html as static file
      { test: /\.html$/,                    loader: 'raw' },
      // Support for .ts files.
      { test: /\.ts$/,                      loader: 'typescript-simple' }
    ],
    noParse: [
      /falcor\/dist\/falcor\.browser/,
      /rtts_assert\/src\/rtts_assert/,
      /zone\.js\/dist\/zone-microtask\.min\.js/,
      /zone\.js\/dist\/zone-microtask\.js/,
      // /zone\.js\/lib\/browser\/zone-microtask\.js/,
      // /zone\.js\/lib\/browser\/zone\.js/
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'angular2',
      minChunks: Infinity,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js'
    }),
    new webpack.DefinePlugin({
      'ENV': {
        'type': JSON.stringify('development'),
        'debug': true
      }
    }),
    // new HtmlWebpackPlugin({
    //   inject: true,
    //   template: './src/index.html',
    //   title: getBanner(),
    //   filename: '../index.html',
    //   chunks: ['shared']
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     drop_debugger: false
    //   }
    // beautify: false
    // }),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.BannerPlugin(getBanner())
  ]

};

function getBanner() {
  return 'Angular2 Webpack Starter by @gdi2990 from @AngularClass';
}


