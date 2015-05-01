import {Promise, PromiseWrapper} from 'angular2/src/facade/async';
import {isBlank, isPresent} from 'angular2/src/facade/lang';
import {Pipe, ChangeDetectorRef, NO_CHANGE} from 'angular2/change_detection'; // WrappedValue
import Rx from 'rx/dist/rx.all';

import {WrappedValue} from 'app/pipes/wrappedvalue';

export class PromisePipe extends Pipe {
  _ref:ChangeDetectorRef;

  _latestValue:Object;
  _latestReturnedValue:Object;

  _promise:Promise;

  constructor(ref:ChangeDetectorRef) {
    super();
    this._ref = ref;
    this._latestValue = null;
    this._latestReturnedValue = null;
    this._promise = null;
  }

  supports(promise):boolean {
    return PromiseWrapper.isPromise(promise);
  }

  onDestroy():void {
    //NO-OP
  }

  transform(promise:Promise):any {
    var pipe = this;
    if (isBlank(this._sourcePromise)) {
      this._sourcePromise = promise;
      promise.then((val) => {
        if (pipe._sourcePromise === promise) {
          pipe._updateLatestValue(val);
        }
      });
      return null;
    }

    if (promise !== this._sourcePromise) {
      this._sourcePromise = null;
      return this.transform(promise);
    }

    if (this._latestValue === this._latestReturnedValue) {
      return NO_CHANGE;
    } else {
      this._latestReturnedValue = this._latestValue;
      return this._latestValue;
    }
  }

  _updateLatestValue(value:Object) {
    this._latestValue = value;
    this._ref.requestCheck();
  }
}

/**
 * Provides a factory for [PromisePipe].
 *
 * @exportedAs angular2/pipes
 */
export class PromisePipeFactory {
  supports(promise):boolean {
    return PromiseWrapper.isPromise(promise);
  }

  create(cdRef):Pipe {
    return new PromisePipe(cdRef);
  }
}
