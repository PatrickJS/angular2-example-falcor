var util = require('util');
var FalcorRouter = require('falcor-router');
var falcor = require('falcor');
var Rx = require('rx');
var $ref = falcor.Model.ref;

var movies = require('./movies.json');

function TestRouter(request, routes, options) {
    FalcorRouter.call(this, routes, options);
    this._request = request;
}
util.inherits(TestRouter, FalcorRouter);

module.exports = function() {
  var routes = [
    {
      route: "genres[{ranges}]",
      get: function(pathSet) {
        var genres = {}
        pathSet[1].forEach(function(range) {
          for (var index = range.from; index <= range.to; index++) {
            genres[index] = $ref(['titlesById', index])
          }
        });
        return Rx.Observable.of({
          jsong: {genres: genres}
        });
      }//get
    }
  ];

  ([
    'id',
    'name',
    'rating',
    'seasons',
    'img',
    'copy',
    'starring',
    'genres'
  ]).forEach(function(prop) {
    var config = {
      route: 'titlesById[{integers}].'+prop,
      get: function(pathSet) {
        var delayTime = ~~(Math.random()*500);
        console.log('\nPATHSET\n', pathSet, '\ndelay', delayTime, '\n');

        var titlesById = {};
        pathSet[1].forEach(function(id) {
          titlesById[id] = titlesById[id] || {};
          titlesById[id][prop] = movies[id][prop];
        });

        return Rx.Observable.of({

          jsong: {
            titlesById: titlesById
          }

        }).delay(delayTime);
      }
    };
    if (prop === 'rating') {
      config.set = function(jsongPaths) {
        var delayTime = ~~(Math.random()*500);
        console.log('\nrating SET\n', JSON.stringify(jsongPaths), '\n');

        return Rx.Observable.of({

          jsong: jsongPaths

        }).delay(delayTime);
      }
    }
    routes.push(config);
  });

  return new TestRouter(null, routes);
}
