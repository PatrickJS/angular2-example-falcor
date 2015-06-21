var util = require('util');
var FalcorRouter = require('falcor-router');
var falcor = require('falcor');
var Rx = require('rx');
var $ref = falcor.Model.ref;

var movies = require('./movies.json');
var netflix = require('./netflix.json');

var __genreLists = new Array(netflix.length);
var __titlesById = {};
var __titles = {};

!function() {

  for (var i = 0; i < netflix.length; i++) {
    var genre = netflix[i];
    __genreLists[i] = {
      name: genre.name,
      titles: new Array(genre.titles.length)
    };
    for (var j = 0; j < genre.titles.length; j++) {
      var title = genre.titles[j];
      __titlesById[title.id] = genre.titles[j];
      __genreLists[i].titles[j] = $ref(['titlesById', title.id]);
    };
  };

}();

// console.log(JSON.stringify(genreLists, null, 2));

function TestRouter(request, routes, options) {
    FalcorRouter.call(this, routes, options);
    this._request = request;
}
util.inherits(TestRouter, FalcorRouter);

module.exports = function() {
  var routes = [
    {
      route: "genreLists[{ranges}]",
      get: function(pathSet) {
        var genreLists = {}
        pathSet[1].forEach(function(range) {
          for (var index = range.from; index <= range.to; index++) {
            genreLists[index] = $ref(['titlesById', index])
          }
        });
        return Rx.Observable.of({
          jsong: {genreLists: genreLists}
        });
      }//get
    },
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
    'title',
    'year',
    'description',
    'rating',
    'boxshot'
  ]).forEach(function(prop) {
    var config = {
      route: 'titlesByRealId[{integers}].'+prop,
      get: function(pathSet) {
        var delayTime = ~~(Math.random()*500);
        console.log('\nPATH GET\n', pathSet, '\ndelay', delayTime, '\n');

        var titlesByRealId = {};
        pathSet[1].forEach(function(id) {
          titlesByRealId[id] = titlesByRealId[id] || {};
          titlesByRealId[id][prop] = __titlesById[id][prop];
        });

        return Rx.Observable.of({

          jsong: {
            titlesByRealId: titlesByRealId
          }

        }).delay(delayTime);
      }
    };
    if (prop === 'rating') {
      config.set = function(jsongPaths) {
        var delayTime = ~~(Math.random()*500);
        console.log('\nrating SET\n', JSON.stringify(jsongPaths), '\n');

        // Object.assign(movies, jsongPaths.titlesById);

        return Rx.Observable.of({

          jsong: jsongPaths

        }).delay(delayTime);
      }
    }
    routes.push(config);
  });


  ([
    'id',
    'title',
    'rating',
    'seasons',
    'boxshot',
    'description',
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

        // Object.assign(movies, jsongPaths.titlesById);

        return Rx.Observable.of({

          jsong: jsongPaths

        }).delay(delayTime);
      }
    }
    routes.push(config);
  });

  return new TestRouter(null, routes);
}
