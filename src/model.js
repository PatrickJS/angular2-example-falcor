import falcor from 'falcor';
// import {Observable} from 'rx';

var Model = falcor.Model;
var $ref = falcor.Model.ref;

var model = new Model({
  cache: getCache()
});

// var newModel = model.bind('genres[0].titles[0]', 'name');

export {
  model,
  Model,
  $ref
};


