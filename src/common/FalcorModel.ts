import {bind, Inject} from 'angular2/di';

import {Model} from 'falcor';
import {XMLHttpSource} from 'falcor-browser';

import {initialCache} from './initialCache';

var $ref = Model.ref;

class ModelRoot {
  expired:any = [];
  allowSync:number = 1;
  unsafeMode:boolean = false;
}

export class FalcorModel extends Model {
  constructor(@Inject('initialCache') cache) {
    super({
      cache: cache,
      source: new XMLHttpSource('model.json', 15000),
      root: new ModelRoot()
    });
  }
}



export var falcorInjectibles = [
  bind('initialCache').toValue(initialCache),
  bind(FalcorModel).toClass(FalcorModel)
];
