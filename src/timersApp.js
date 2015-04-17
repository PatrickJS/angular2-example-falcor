import {bootstrap, Component, Decorator, View, NgElement} from 'angular2/angular2';
import {For} from 'angular2/directives';

import {LifeCycle} from 'angular2/src/core/life_cycle/life_cycle';
import {bind} from 'angular2/di';
import Rx from 'rx/dist/rx.all';


@Component({
  selector: 'timers-app'
})
@View({
  template: `<timers-cmp [timers]="timers">`, //Observable<List<Observable>>
  directives: [
    TimersCmp
  ]
})
class TimersApp {
  timers:any;

  constructor(lc:LifeCycle) {
    var x = [
      Rx.Observable.timer(100, 1000).timeInterval().map((v) => v.value),
      Rx.Observable.timer(100, 2000).timeInterval().map((v) => v.value),
      Rx.Observable.timer(100, 3000).timeInterval().map((v) => v.value)
    ];
    this.timers = new Rx.BehaviorSubject(x);
  }
}


/**
 * Note that I am using the rx pipe in the binding position.
 * I could have changed it and instead "dereference" it in the bind as follows `timers: 'timers | rx'`
 */
@Component({
  selector: 'timers-cmp',
  properties: {
    timers: 'timers'
  }
})
@View({
  template: `
    <timer-cmp *for="var t of (timers | async)" [timer]="t"></timer-cmp>
  `,
  directives: [
    TimerCmp,
    For
  ]
})
class TimersCmp {
  timers:any; //Observable<List<Observable>>
}

/**
 * Note that I am using the rx pipe in the bind config.
 * I could have changed it and instead "dereference" it in the binding as follows {{timer | rx}}
 */
@Component({
  selector: 'timer-cmp',
  properties: {
    timer: 'timer | async'
  }
})
@View({
  template: `<div>Time {{timer}}</div>`,
  directives: []
})
class TimerCmp {
  timer:number;
}

bootstrap(TimersApp);
