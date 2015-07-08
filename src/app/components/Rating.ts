import {Directive, Component, View} from 'angular2/angular2';
import {EventEmitter, onChange, onDestroy, ON_PUSH, NgFor} from 'angular2/angular2';

@Component({
  selector: 'rating',
  lifecycle: [onChange, onDestroy],
  // changeDetection: ON_PUSH,
  properties: ['model: rate'],
  events: ['update: rate']
})
@View({
  directives: [ NgFor ],
  template: `
  <style>
    .rating {
      unicode-bidi: bidi-override;
      direction: rtl;
    }
    .rating > span {
      cursor: pointer;
      display: inline-block;
      position: relative;
      width: 1.1em;
      text-shadow: -0.25px 0 black, 0 0.25px black, 0.25px 0 black, 0 -0.25px black;
    }
    .rating > span:hover:before,
    .rating > span:hover ~ span:before {
       content: "\\2605";
       color: gold;
       position: absolute;
    }
  </style>

  <span class="rating">
    <span *ng-for="var star of stars; var $index = index" (^click)="onClick($event, $index)">{{ star }}</span>
  </span>
  `
})
export class Rating {
  model: any;
  update: EventEmitter = new EventEmitter();
  stars: string[];
  _lastRating: number;
  constructor() {
    // Todo: use <content> with two insertion points
    // Todo: set stars declaratively
    this.stars = ['☆','☆','☆','☆','☆'];
    this._lastRating = null;
  }

  onClick(event, index) {
    var count = Math.abs(index - this.stars.length);
    if (count !== this._lastRating) {
      this._lastRating = count;
      this.setRate(index);
      this.update.next(count);
    }
    return false;
  }
  onChange() {
    if (this.model !== null && this.model !== this._lastRating) {
      console.log('rate', this.model);
      var rate = Math.abs(this.model - this.stars.length)
      this.setRate(rate);
    }
  }
  onDestroy() {
    this._lastRating = null;
  }

  setRate(num) {
    // reversed due to css highlighting

    for (let counter = 0; counter < this.stars.length; counter++) {
      if (counter < num) {
        if (this.stars[counter] === '☆') { continue };
        this.stars[counter] = '☆';
      } else {
        if (this.stars[counter] === '★') { continue };
        this.stars[counter] = '★';
      }//counter
    }//for

  }//setRate
}
