import {NgElement, Attribute, Decorator, onDestory} from 'angular2/angular2';
import {VmTurnZone} from 'angular2/src/core/zone/vm_turn_zone';

export class Scrollable {
  pageSize: number;
  constructor(pageSize, scrollType, el, zone) {
    this.pageSize = pageSize;
    this.scrollType = scrollType;
    this.zone = zone;
    this.el = (this.scrollType === 'y') ? window.document : el;
    this.timer = null;

    this.listener = this.onScroll.bind(this);
    this.zone.runOutsideAngular(() => {
      this.el.addEventListener('scroll', this.listener, false);
    });
    this.ticking = false;
    this.body = document.body;
    this.innerHeight =  window.innerHeight;
    this.innerWidth =  window.innerWidth;
  }
  onUpdate(callback) {
    this.handler = callback;
  }
  onDestroy() {
    this.zone.runOutsideAngular(() => {
      this.el.removeEventListener('scroll', this.listener, false);
      this.listener = null;
    })
    this.body = null;
    this.innerHeight = null;
    this.lastScrollY = null;
    this.lastScrollX = null;
    this.offsetHeight = null;
    this.offsetWidth = null;
    this.el = null;
    this.timer = null;
  }
  onScroll() {
    this.lastScrollY = window.scrollY;
    this.lastScrollX = this.el.scrollLeft;
    this.offsetHeight = this.body.offsetHeight;

    if (this.scrollType === 'y') {
      if (this.isBottom()) {
        this.requestTick();
      }
    } else if (this.scrollType === 'x') {
      if (this.isRight()) {
        this.requestTick();
      }
    }
  }
  requestTick() {
    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(this.update.bind(this));
    }
  }
  update(pageSize) {
    this.handler(pageSize);
    this.ticking = false;
  }
  isBottom() {
    this.lastCal = this.innerHeight + this.lastScrollY;
    var isbottom = (this.lastCal >= this.offsetHeight * 0.7);
    // console.log(window.scrollY, 'isbottom', isbottom, this.lastScrollY, this.innerHeight, this.offsetHeight, 'this.lastCal', this.lastCal);
    return isbottom;
  }
  isRight() {
    this.lastCal = this.el.offsetWidth + this.lastScrollX;
    var isright = (this.lastCal >= this.el.scrollWidth * 0.7);
    // console.log(this.el.offsetWidth, 'isright', isright, '\n', this.lastCal, this.el.offsetWidth);
    return isright;
  }
}


// Directive
@Decorator({
  selector: '[scroller]',
  lifecycle: ['onDestroy'],
  injectables: [NgElement , VmTurnZone],
  properties: {
    'scroller' : 'scroller'
  }
})
export class Scroller {
  pageSize: number;
  constructor(
    @Attribute('scroll') scrollType,
    @Attribute('page-size') pageSize,
    zone: VmTurnZone, el: NgElement) {

    this.ticking = false;

    var scrollable = new Scrollable(pageSize, scrollType, el.domElement, zone);

    scrollable.onUpdate(() => {
      zone.run(() => {
        this.scroller.addMore(pageSize);
      });
    });

  }
  onDestroy() {
    // this.scrollable.onDestroy();
    // this.scrollable = null;
  }
}
