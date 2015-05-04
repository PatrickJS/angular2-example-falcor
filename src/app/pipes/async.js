import {Observable, ObservableWrapper} from 'angular2/src/facade/async';
import {isBlank, isPresent} from 'angular2/src/facade/lang';
import {Pipe, ChangeDetectorRef, NO_CHANGE} from 'angular2/change_detection'; // WrappedValue
import Rx from 'rx/dist/rx.all';

import {WrappedValue} from 'app/pipes/wrappedvalue';
/**
 * Implements async bindings to Observable.
 *
 * # Example
 *
 * In this example we bind the description observable to the DOM. The async pipe will convert an observable to the
 * latest value it emitted. It will also request a change detection check when a new value is emitted.
 *
 *  ```
 * @Component({
 *   selector: "task-cmp",
 *   changeDetection: ON_PUSH
 * })
 * @View({
 *  inline: "Task Description {{description|async}}"
 * })
 * class Task {
 *  description:Observable<string>;
 * }
 *
 * ```
 *
 * @exportedAs angular2/pipes
 */
export class AsyncPipe extends Pipe {
  _ref:ChangeDetectorRef;

  _latestValue:Object;
  _latestReturnedValue:Object;

  _subscription:Object;
  _observable:Observable;

  constructor(ref:ChangeDetectorRef) {
    super();
    this._ref = ref;
    this._latestValue = null;
    this._latestReturnedValue = null;
    this._subscription = null;
    this._observable = null;
  }

  supports(obs):boolean {
    return ObservableWrapper.isObservable(obs) || isRxObservable(obs);
  }

  onDestroy():void {
    if (isPresent(this._subscription)) {
      this._dispose();
    };
  }

  transform(obs:Observable):any {
    if (isBlank(this._subscription)) {
      this._observable = obs;
      this._subscription = this._subscribe(obs);
      // return null;
      return this._latestValue; // return null
    }

    if (obs !== this._observable) {
      this._dispose();
      return this.transform(obs);
    }

    if (this._latestValue === this._latestReturnedValue) {
      return NO_CHANGE;
    } else {
      this._latestReturnedValue = this._latestValue;
      return this._latestValue
    }
  }

  _subscribe(obs:Observable):void {
    this._observable = obs;
    if (obs.observer) {
      this._subscription = ObservableWrapper.subscribe(obs,
        value => {
          return this._updateLatestValue(value)
        },
        e => {throw e;}
      );
    } else if (obs.subscribe) {
      // Rx
      this._subscription = obs.subscribe(
        value => {
          return this._updateLatestValue(value)
        },
        e => {throw e;}
      );
    }
  }

  _dispose():void {
    ObservableWrapper.dispose(this._subscription);
    this._latestValue = null;
    this._latestReturnedValue = null;
    this._subscription = null;
    this._observable = null;
  }

  _updateLatestValue(value):void {
    this._latestValue = value;
    // this._ref.requestCheck();
  }
}

/**
 * Provides a factory for [AsyncPipe].
 *
 * @exportedAs angular2/pipes
 */
export class AsyncPipeFactory {
  supports(obs):boolean {
    return ObservableWrapper.isObservable(obs) || isRxObservable(obs)
  }

  create(cdRef):Pipe {
    return new AsyncPipe(cdRef);
  }
}


function isRxObservable(obs) {
  return obs instanceof Rx.Observable || obs.subscribe !== undefined;//instanceof Rx.Observable;
}
