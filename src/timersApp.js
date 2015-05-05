import {bootstrap, Component, Decorator, View, NgElement} from 'angular2/angular2';
import {For} from 'angular2/directives';

import {bind} from 'angular2/di';
import Rx from 'rx/dist/rx.all';
import {PipeRegistry} from 'angular2/change_detection';

import {pipeInjectables} from 'pipes/pipes';

@Component({
  selector: 'timers-app'
})
@View({
  //Observable<List<Observable>>
  template: `
  <timers-cmp [timers]="timers | async">
  `,
  directives: [
    TimersCmp
  ]
})
class TimersApp {
  timers:any;

  constructor() {
    var x = [
      Rx.Observable.timer(100, 1000).timeInterval().map((v) => v.value),
      Rx.Observable.timer(100, 2000).timeInterval().map((v) => v.value),
      Rx.Observable.timer(100, 3000).timeInterval().map((v) => v.value)
    ];
    this.timers = new Rx.BehaviorSubject(x);
  }
}


/**
 * Note that I am using the async pipe in the binding position.
 * I could have changed it and instead "dereference" it in the bind as follows `timers: 'timers | async'`
 */
@Component({
  selector: 'timers-cmp',
  properties: {
    timers: 'timers'
  }
})
@View({
  template: `
    <timer-cmp *for="#t of timers" [timers]="t | async"></timer-cmp>
  `,
  directives: [
    TimerCmp,
    For
  ]
})
class TimersCmp {
  timers:any; //Observable<List<Observable>>
  constructor() {
  }
  set timers(val) {
    debugger;
    return val;
  }
}

/**
 * Note that I am using the async pipe in the bind config.
 * I could have changed it and instead "dereference" it in the binding as follows {{ timer | async }}
 */
@Component({
  selector: 'timer-cmp',
  properties: {
    timers: 'timers'
  }
})
@View({
  template: `<div>Time {{ timer }}</div>`,
  directives: []
})
class TimerCmp {
  timer:number;
}

bootstrap(TimersApp, [
  bind(PipeRegistry).toValue(new PipeRegistry(pipes))
]);
