import {Component, View, Decorator, Attribute, onChange, onDestory} from 'angular2/angular2';
import {If, For, Switch, SwitchWhen, SwitchDefault} from 'angular2/directives';
import {bootstrap, NgElement} from 'angular2/angular2';
import {VmTurnZone} from 'angular2/src/core/zone/vm_turn_zone';

import {bind} from 'angular2/di';

import falcor from 'falcor';
import XMLHttpSource from 'falcor-browser';

import {pipeInjectables} from 'app/pipes/pipes';

import {ViewTeleporter} from 'app/ViewTeleporter';
import {state} from 'app/state';


@Component({
  selector: 'movie-details',
  properties: { model: 'model' }
})
@View({
  template: `
  <button (click)="back()">Back</button>
  <h3 class="movie-name">{{ model.getValue('name') | async }}</h3>
  <hr>
  <div class="side-details">
    <img [src]="model.getValue('img') | async">
    <b>Rating</b>: {{ rate((model.getValue('rating') | async)) }}
  </div>
  <div class="movie-copy">
    <p>
      {{ model.getValue('copy') | async }}
    </p>
    <ul>
      <li>
        <b>Starring</b>: {{ model.getValue('starring') | async }}
      </li>
      <li>
        <b>Genres</b>: {{ model.getValue('genres') | async }}
      </li>
    <ul>
  </div>
  `,
  directives: [ If, MovieDetails ]
})
class MovieDetails {
  constructor(router: ViewTeleporter) {
    this.router = router;
  }
  back() {
    this.router.back();
  }
  rate(num) {
    var stars = '';
    if (num !== undefined) {
      for(var counter = 0; counter < 5; counter++) {
        stars += (counter < num) ? "★" : "☆";
      }
    }
    return stars;
  }

}

@Component({
  selector: 'movie',
  properties: { model: 'model' },
  injectables: [ ViewTeleporter ]
})
@View({
  template: `
  <div class="movie" >
    <a (^click)="details(model)" [href]="'#/'+ (model.getValue('name') | async)" >
      <img [src]="model.getValue('img') | async" class="boxShotImg movie-box-image">
    </a>
  </div>
  `,
  directives: [ If ]
})
class Movie {
  constructor(router: ViewTeleporter) {
    this.router = router;
  }
  details(model) {
    this.router.details(model);
  }
}


class Scrollable {
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


@Decorator({
  selector: '[scroller]',
  lifecycle: ['onDestroy'],
  properties: {
    'scroller' : 'scroller'
  }
})
class Scroller {
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


@Component({
  selector: 'genres-list',
  properties: { model: 'model' }
})
@View({
  template: `
  <h2 class="genre-name">
    {{ model.getValue('name') | async }}
  </h2>
  <!--
  -->
  <div class="scroll-row" *if="state.movieList.length" page-size="12" scroll="x" [scroller]="state">
    <movie *for="var movie of state.movieList" [model]="movie | async"></movie>
  <div>
  <!--
  -->
  `,
  directives: [ Movie , Scroller, For, If ]
})
class GenreList {
  constructor(
    @Attribute('scroll') scrollType,
    @Attribute('page-size') pageSize,
    zone: VmTurnZone, el: NgElement) {

    this._model = null;
    this.initModel = null;
    this.pageSize = pageSize;
    var self = this;

    var movie = {
      movieList: [
      ],
      lastItem: 0,
      addMore: function(pageSize) {
        var len = movie.movieList.length;
        var index = movie.lastItem;
        if (movie.lastItem === (pageSize || self.pageSize)-1) {
          movie.lastItem = 0;
        } else {
          movie.lastItem++;
        }

        if (self.model) {
          movie.movieList.push(
            self.model.bind(['titles', index], 'name')
          );
        }
      }
    };

    this.state = movie;
  }
  set model(val) {
    if (!this._model && val) {
      this._model = val;
      this.init(this._model);
    }
    return this._model;
  }
  get model() {
    return this._model;
  }
  init(val) {
    if (this.initModel && this.model) return;
    this.initModel = true;
    this.state.defaultTitles = [];
    for (var i = 0; i < this.pageSize; i++) {
      this.state.defaultTitles.push(
        this.model.bind(['titles', i], 'name')
      );
    }
    this.state.movieList = [].concat(this.state.movieList, this.state.defaultTitles);
    // for (var i = 0; i < 8; i++) {
    //   this.state.addMore(8)
    // };
  }
}

@Component({
  selector: 'app',
  injectables: [ ViewTeleporter ]
})
@View({
  template: `
  <navbar id="hd">
    <h1 class="logo" (click)="home()">Angular 2 + FalcorJS</h1>
  </navbar>

  <main>
    <div *if="details">
      <movie-details [model]="detailModel"></movie-details>
    </div>

    <div *if="!details" page-size="4" scroll="y" [scroller]="state">
      <genres-list *for="var genre of state.genresList" [model]="genre | async" page-size="12"></genres-list>
    </div>
  </main>


  `,
  directives: [ If, For, GenreList, MovieDetails, Scroller ]
})
class App {

  constructor(router: ViewTeleporter) {
    // FalcorModel
    var model = new falcor.Model({
      cache: state
    });
    this.model = model;

    var self = this;

    var genre = {
      genresList: [
      ],
      defaultTitles: [
        model.bind(['genres', 0], 'name'),
        model.bind(['genres', 1], 'name'),
        model.bind(['genres', 2], 'name'),
        model.bind(['genres', 3], 'name')
      ],
      lastItem: 0,
      addMore: function(pageSize) {
        var len = genre.genresList.length;
        var index = genre.lastItem;
        if (self.model && self.model.bind) {
          if (genre.lastItem === pageSize-1) {
            genre.lastItem = 0;
          } else {
            genre.lastItem++;
          }

          genre.genresList.push(
            self.model.bind(['genres', index], 'name')
          );
        }
      }
    };
    genre.addMore(4)
    genre.addMore(4)
    genre.addMore(4)
    genre.addMore(4)
    this.state = genre;
    // document.


    this.router = router;
    this.details = false;

    // default model
    var detailsModel = model.bind('genres[0].titles[0]', 'name');
    detailsModel.forEach(this.setRoute.bind(this));
    // on route change
    this.router.onChange(this.changeRoute.bind(this));
  }

  home() {
    this.details = false
  }
  changeRoute(model) {
    if (model) {
      this.detailModel = model;
      this.details = true;
    } else {
      if (this.lastValue) { this.detailModel = this.lastValue; }
      this.details = false;
    }
  }
  setRoute(json) {
    this.lastValue = this.detailModel;
    this.detailModel = json;
  }

}

bootstrap(App, [
  // bind(Router).toValue(new RootRouter(new Pipeline())),
  pipeInjectables
]);
