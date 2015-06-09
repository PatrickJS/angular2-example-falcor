var FalcorRouter = require('falcor-router');
var falcor = require('falcor');
var Rx = require('rx');
var $ref = falcor.Model.ref;

function TestRouter(request, routes, options) {
    FalcorRouter.call(this, routes, options);
    this._request = request;
}
util.inherits(TestRouter, FalcorRouter);

module.exports = function() {

  return new TestRouter(null, [
    {
      route: "titlesById[{integers}].name",
      get: function(pathSet) {
        var titlesById = {}
        pathSet[1].forEach(function(id) {
          titlesById[id] = {
            name: "Jim" + id
          }
        })
        return Rx.Observable.of({
          jsong: {titlesById: titlesById}
        })
      }
    },
    {
      route: "list[{ranges}]",
      get: function(pathSet) {
        var list = {}
        pathSet[1].forEach(function(range) {
          for (var index = range.from; index <= range.to; index++) {
            list[index] = $ref(['titlesById', index])
          }
        });
        return Rx.Observable.of({
          jsong: {list: list}
        })
      }
    }
  ]);
}
