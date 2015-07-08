import {bind, Inject, Injectable} from 'angular2/di';

import {Model} from 'falcor';
import {XMLHttpSource} from 'falcor-browser';

// import {initialCache} from './demoCache';
import {initialCache} from './initialCache';

// class ModelRoot {
//   expired:any = [];
//   allowSync:number = 1;
//   unsafeMode:boolean = false;
// }
@Injectable()
export class AppDataSource extends XMLHttpSource {
  constructor(@Inject('modelPath') path: string) {
    super(path, {
      headers: {},
      timeout: 15000
    });
  }
}

@Injectable()
export class FalcorModel extends Model {
  constructor(source: AppDataSource, @Inject('initialCache') cache) {
    super({
      cache: cache,
      source: source
      // root: new ModelRoot() // needed for image src
    });
  }
}



export var falcorInjectibles = [
  bind('modelPath').toValue('/model.json'),
  bind('initialCache').toValue(initialCache),
  AppDataSource,
  FalcorModel
];
