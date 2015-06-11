import {Directive, Component, View, EventEmitter, onChange, coreDirectives} from 'angular2/angular2';

@Component({
  selector: 'rating',
  properties: ['rate'],
  events: ['click'],
  lifecycle: [onChange],
})
@View({
  directives: [ coreDirectives ],
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
  rate: any;
  click: EventEmitter = new EventEmitter();
  stars: string[];
  constructor() {
    // Todo: use <content> with two insertion points
    // Todo: set stars declaratively
    this.stars = ['☆','☆','☆','☆','☆'];
  }
  onClick(event, index) {
    var count = Math.abs(index - this.stars.length);
    this.setRate(index);
    this.click.next({ event, count });
  }
  onChange() {
    if (this.rate !== null) {
      // console.log('rate', this.rate);
      var rate = Math.abs(this.rate - this.stars.length)
      this.setRate(rate);
    }
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
