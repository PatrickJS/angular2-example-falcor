/// <reference path="../../typings/tsd.d.ts" />
///
import {async} from 'angular2/src/change_detection/change_detection';
import {ChangeDetectorRef, NullPipeFactory, PipeFactory, Pipe, PipeRegistry, WrappedValue, defaultPipes} from 'angular2/change_detection';
import {bind} from 'angular2/di';
import {ObservablePipe} from 'angular2/pipes';
import * as Rx from 'rx';

import {isBlank, isPresent} from 'angular2/src/facade/lang';
import {PromiseWrapper} from 'angular2/src/facade/async';


class NullPipeFactory2 extends PipeFactory {
  constructor() { super(); }

  supports(obj): boolean { return NullPipe2.supportsObj(obj); }

  create(cdRef): Pipe { return new NullPipe2(); }
}

/**
 * @exportedAs angular2/pipes
 */
class NullPipe2 extends Pipe {
  constructor() {
    super();
  }

  static supportsObj(obj): boolean { return isBlank(obj); }

  supports(obj) { return NullPipe2.supportsObj(obj); }

  transform(value) {
    return value;
  }
}


function isObservable(obs) {
  return obs && obs.subscribe && typeof obs.subscribe === 'function';
}

// class RxPipe extends ObservablePipe {
//   _ref: ChangeDetectorRef;
//   _subscription: any;
//   _observable: any;
//   _latestValue: Object;
//   _immediateScheduler: any;
//   constructor(ref: ChangeDetectorRef) { super(ref); }
//   supports(obs) { return isObservable(obs); }
//   _subscribe(obs) {
//     this._observable = obs;
//     this._immediateScheduler = (<any>Rx.Scheduler).immediate;
//     this._subscription = obs.
//       observeOn(this._immediateScheduler).
//       subscribe(value => {
//         // setTimeout(_ => {
//           this._updateLatestValue(value)
//         // });
//       },
//       e => { throw e; });
//   }
//   onDestroy() {
//     this._immediateScheduler = null;
//     super.onDestroy();
//   }
//   _updateLatestValue(value: Object) {
//     this._latestValue = value;
//     if (this._ref) {
//       this._ref.requestCheck();
//     }
//   }
// }
var id = 0;
class RxPipe extends Pipe {
  _ref: ChangeDetectorRef;
  _promise: Promise<any>;

  _latestValue: Object;
  _latestReturnedValue: Object;


  _immediateScheduler: any;
  _subscription: any;
  _observable: any;
  _pending: any;
  _count: any;


  constructor(ref: ChangeDetectorRef) {
    super();
    this._ref = ref;
    this._latestValue = null;
    this._latestReturnedValue = null;
    this._immediateScheduler = null;
    this._subscription = null;
    this._observable = null;
    this._pending = null;
    this._id = id++;
    this._count = 0;
  }

  supports(obs): boolean { return isObservable(obs); }

  onDestroy(): void {
    if (isPresent(this._subscription)) {
      this._dispose();
    }
    this._latestReturnedValue = null;
    this._latestValue = null;
    this._pending = null;
  }

  transform(obs: any): any {
    this._count++;
    if (this._id === 1) {
      console.log('transform count', this._count)
    }
    if (isBlank(this._subscription)) {
      this._subscribe(obs);
      return this._latestReturnedValue;
    }

    if (isBlank(this._latestReturnedValue)) {
      this._pending = obs;
    } else if (obs !== this._observable) {
      this._dispose();
      return this.transform(obs);
    }

    if (this._latestValue === this._latestReturnedValue) {
      return this._latestReturnedValue;
    } else {
      this._latestReturnedValue = this._latestValue;
      return WrappedValue.wrap(this._latestValue);
    }
  }

  _subscribe(obs: any): void {
    this._observable = obs;
    this._immediateScheduler = (<any>Rx.Scheduler).immediate;
    this._subscription = obs.
      observeOn(this._immediateScheduler).
      subscribe(
        value => {
          if (this._id === 1) {
            console.log('next', value)
          }
          this._updateLatestValue(value)
        },
        e => { throw e; },
        _ => {
          if (this._id === 1) {
            console.log('complete')
          }
          this._dispose()
        }
      );
  }

  _dispose(): void {
    if (isPresent(this._subscription)) {
      this._subscription.dispose();
    }
    // this._latestValue = null;
    this._subscription = null;
    this._observable = null;
    this._immediateScheduler = null;
  }

  _updateLatestValue(value: any): void {
    this._latestValue = value;
    if (isPresent(this._ref)) {
      this._ref.requestCheck();
    }
    if (isPresent(this._pending)) {
      this._dispose();
      let obs = this._pending;
      this._pending = null;
      this.transform(obs);
    }
  }
}




class RxPipeFactory extends PipeFactory {
  constructor() { super(); }
  supports(obs) { return isObservable(obs); }
  create(cdRef: ChangeDetectorRef): Pipe {
    return new RxPipe(cdRef);
  }
}
// class RxPipeFactory2 extends PipeFactory {
//   constructor() {
//     super();
//     console.log('RxPipeFactory2');
//   }
//   supports(obs) { return isObservable(obs); }
//   create(cdRef: ChangeDetectorRef): Pipe {
//     console.log('RxPipeFactory2.create');
//     return new RxPipe2(cdRef);
//   }
// }

var rxAsync = [ new RxPipeFactory() ].concat(async);

// class GetPipe {
//   onDestroy() {}
//   supports(val) { return true }
//   transform(val) {
//     return function getProp(prop) {
//       return (val) ? val[prop] : val;
//     }
//   }
// }

// class GetPipeFactory {
//   // constructor() { super(); }
//   supports(val) { return true }
//   create(ref: any): Pipe { return new GetPipe(); }
// }

// class LogPipe {
//   // constructor() { super(); }
//   supports(val) { return true }
//   transform(val) {
//     console.log(val)
//     return val;
//   }
//   create(ref: any): Pipe { return this }
// }

class OncePipe {
  once: any;
  constructor() {
    this.once = null;
  }
  onDestroy() {}
  supports(val) { return true }
  transform(val) {
    if (val && !this.once) {
      this.once = val;
    }
    return this.once;
  }
}

class OncePipeFactory {
  // constructor() { super(); }
  supports(val) { return true }
  create(ref: any): Pipe { return new OncePipe(); }
}

// var get = [ new GetPipeFactory(), new NullPipeFactory() ];
var once = [ new OncePipeFactory(), new NullPipeFactory() ];

var rxPipes = Object.assign({}, defaultPipes, {
  'async': rxAsync,
  'once': once
  // 'async2': [ new RxPipeFactory2(), new NullPipeFactory() ],
  // 'rx': [ new RxPipeFactory() ],
  // 'log': [ new LogPipe() ],
  // 'get': get,
  // 'invoke': invoke
});

export var rxPipeRegistry = [
  bind(PipeRegistry).toValue(new PipeRegistry(rxPipes))
];
