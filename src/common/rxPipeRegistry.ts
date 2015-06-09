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

class RxPipe extends ObservablePipe {
  _ref: ChangeDetectorRef;
  _subscription: any;
  _observable: any;
  _latestValue: Object;
  _immediateScheduler: any;
  constructor(ref: ChangeDetectorRef) { super(ref); }
  supports(obs) { return isObservable(obs); }
  _subscribe(obs) {
    this._observable = obs;
    this._immediateScheduler = (<any>Rx.Scheduler).immediate;
    this._subscription = obs.
      observeOn(this._immediateScheduler).
      subscribe(value => {
        setTimeout(_ => this._updateLatestValue(value));
      },
      e => { throw e; });
  }
  onDestroy() {
    this._immediateScheduler = null;
    super.onDestroy();
  }
  _updateLatestValue(value: Object) {
    this._latestValue = value;
    if (this._ref) {
      this._ref.requestCheck();
    }
  }
}

// class RxPipe extends Pipe {
//   _ref: ChangeDetectorRef;
//   _promise: Promise<any>;

//   _latestValue: Object;
//   _latestReturnedValue: Object;


//   _immediateScheduler: any;
//   _subscription: any;
//   _observable: any;

//   constructor(ref: ChangeDetectorRef) {
//     super();
//     console.log('RxPipe2');
//     this._ref = ref;
//     this._latestValue = null;
//     this._latestReturnedValue = null;
//     this._immediateScheduler = null;
//     this._subscription = null;
//     this._observable = null;
//     // this._promise = Promise.resolve(true);
//   }

//   supports(obs): boolean { return isObservable(obs); }

//   onDestroy(): void {
//     if (isPresent(this._subscription)) {
//       this._dispose();
//     }
//   }

//   transform(obs: any): any {
//     if (isBlank(this._subscription)) {
//       this._subscribe(obs);
//       return null;
//     }

//     if (obs !== this._observable) {
//       this._dispose();
//       return this.transform(obs);
//     }

//     // if (this._latestValue === this._latestReturnedValue) {
//     //   return WrappedValue.wrap(this._latestReturnedValue);
//     //   // return this._latestReturnedValue;
//     // } else {
//       // this._latestReturnedValue = this._latestValue;
//       return WrappedValue.wrap(this._latestValue);
//     // }
//   }

//   _subscribe(obs: any): void {
//     this._observable = obs;
//     this._immediateScheduler = (<any>Rx.Scheduler).immediate;
//     this._subscription = obs.
//       observeOn(this._immediateScheduler).
//       subscribe(
//       value => {
//         // if (!this._ref) {
//           // this._promise.then(_ => {
//             // console.log('next promise', value);
//             // this._updateLatestValue(value);
//           // });
//         // } else {
//           // setTimeout(_ => {
//             console.log('2 next timeout', value);
//             this._updateLatestValue(value);
//           // });
//         // }
//       },
//       e => { throw e; }
//       // value => {
//         // console.log('COMPLETE', value);
//         // setTimeout(_ => {
//         // })
//       // }
//     );
//   }

//   _dispose(): void {
//     this._subscription.dispose();
//     this._latestValue = null;
//     this._latestReturnedValue = null;
//     this._immediateScheduler = null;
//     this._subscription = null;
//     this._observable = null;
//   }

//   _updateLatestValue(value: any): void {
//     this._latestValue = value;
//     if (this._ref) {
//       this._ref.requestCheck();
//     }
//   }
// }




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

// class InvokePipe {
//   onDestroy() {}
//   supports(val) { return true }
//   transform(val) {
//     return function getProp(prop, ...args) {
//       return (val && prop && val[prop]) ? val[prop](args) : val;
//     }
//   }
// }

// class InvokePipeFactory {
//   // constructor() { super(); }
//   supports(val) { return true }
//   create(ref: any): Pipe { return new InvokePipe(); }
// }

// var get = [ new GetPipeFactory(), new NullPipeFactory() ];
// var invoke = [ new InvokePipeFactory(), new NullPipeFactory() ];

var rxPipes = Object.assign({}, defaultPipes, {
  'async': rxAsync
  // 'async2': [ new RxPipeFactory2(), new NullPipeFactory() ],
  // 'rx': [ new RxPipeFactory() ],
  // 'log': [ new LogPipe() ],
  // 'get': get,
  // 'invoke': invoke
});

export var rxPipeRegistry = [
  bind(PipeRegistry).toValue(new PipeRegistry(rxPipes))
];
