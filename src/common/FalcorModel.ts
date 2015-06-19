import {bind, Inject} from 'angular2/di';

import {Model} from 'falcor';
import {XMLHttpSource} from 'falcor-browser';

// import {initialCache} from './demoCache';
import {initialCache} from './initialCache';

var $ref = Model.ref;

class ModelRoot {
  expired:any = [];
  allowSync:number = 1;
  unsafeMode:boolean = false;
}

export class AppSource extends XMLHttpSource {
  constructor(@Inject('modelPath') path: string) {
    super(path, {
      headers: {},
      timeout: 15000
    })
  }
}

export class FalcorModel extends Model {
  constructor(source: AppSource, @Inject('initialCache') cache) {
    super({
      cache: cache,
      source: source,
      root: new ModelRoot() // needed for imagine that need getValueSync
    });
  }
}



export var falcorInjectibles = [
  bind('modelPath').toValue('/model.json'),
  bind('initialCache').toValue(initialCache),
  AppSource,
  FalcorModel
];
