/// <reference path="../../typings/tsd.d.ts" />

// Angular 2
import {Directive, Component, View, onChange, onDestroy, onInit} from 'angular2/angular2';
import {bind, Inject} from 'angular2/di';
import {RouteConfig, Router, RouteParams, Location} from 'angular2/router';

import * as Rx from 'rx';

// Import all of our custom app directives
import {coreDirectives} from 'angular2/directives';
// import {routerDirectives} from 'angular2/router';
import {routerDirectives} from 'patch_angular2/router';
// App
import {appDirectives} from './directives/directives';

// Falcor
import {FalcorModel} from 'common/FalcorModel';
// import {FalcorView} from 'falcor-angular';


// Components
import {Rating} from 'components/Rating';


// Components


@Component({
  selector: 'movie-details',
  lifecycle: [onDestroy],
})
@View({
  directives: [ coreDirectives, appDirectives, Rating ],
  template: `
  <div *ng-if="model">

    <button (click)="back()">Back</button>

    <h3 class="movie-name">
      {{ model?.getValue('name') | async }}
    </h3>
    <hr>
    <div class="side-details">
      <div>
        <img [src]="state?.img | async || ''">
      </div>

      <b>Rating</b>: <rating [rate]="state?.rating | async" (click)="onRating($event)")></rating>
    </div>
    <div class="movie-copy">
      <p>
        {{ state?.copy | async }}
      </p>
      <ul>
        <li>
          <b>Starring</b>: {{ state?.starring | async }}
        </li>
        <li>
          <b>Genres</b>: {{ state?.genres | async }}
        </li>
      <ul>
    </div>
  </div>
  `
})
@RouteConfig({
  path: '/details/:id/:path', as: 'details', component: MovieDetails
})
export class MovieDetails {
  _subscription: any;
  _path: string;
  model: any;
  state: any = {};
  constructor(
    // public router: Router,
    public routeParams: RouteParams,
    public falcorModel: FalcorModel,
    private _location: Location) {

    if (routeParams.get('path')) {
      // problably could be refactored into a client version of falcor-router
      this._path = this.getUrlPath(routeParams.get('path'));
      this.updateModel([
        'name',
        'img',
        'rating',
        'copy',
        'starring',
        'genres'
      ]);
    }//routeParams

  }
  updateModel(value) {
    this._subscription = this.falcorModel.
      bind(this._path, 'name').
      tap(model => this.model = this.model || model).
      subscribe( model => {
        var state = this.getValues(model, value);
        this.setState(state);
      });
  }

  getValues(model, values: Array<string>) {
    var obj = {};
    values.forEach(prop => obj[prop] = model.getValue(prop));
    return obj;
  }

  setState(state) {
    this.state = Object.assign({}, this.state, state);
  }

  onRating(event) {
    this.setModel('rating', event.count)
  }

  setModel(path, value) {
    var obs = this.model.setValue(path, value);
    obs.subscribe(value => this.updateModel([path]));
  }


  getUrlPath(path) {
    return JSON.parse(decodeURIComponent(path));
  }


  back() {
    setTimeout(_ => this._location.back());
  }

  onDestroy() {
    if (this._subscription && this._subscription.dispose) this._subscription.dispose();
  }
}


@Component({
  selector: 'movie',
  properties: [
    'model: model',
    'id: id'
  ],
  // lifecycle: [onChange]
})
@View({
  directives: [ routerDirectives, coreDirectives, appDirectives ],
  template: `
  <div class="movie">
    <a router-link="details" [router-params]="{
      'id':   model?.getValueSync('id'),
      'path': stringify(model?.toJSON()?.value)
    }">
      <img [src]="model?.getValueSync('img') || '' " class="boxShotImg movie-box-image">
    </a>
  </div>
  `
})
export class Movie {
  id: any;
  stringify(str) {
    // return encodeURIComponent(JSON.stringify(str));
    return JSON.stringify(str);
  }
  constructor(public router: Router) {
  }

}


@Component({
  selector: 'genre-list',
  properties: [
    'model: model',
    'id: id'
  ],
  lifecycle: [onChange]
})
@View({
  directives: [ routerDirectives, coreDirectives, appDirectives, Movie, MovieDetails ],
  template: `
  <div *ng-if="model">
    <h2 class="genre-name">
      {{ model?.getValueSync('name') }}
    </h2>
    <div class="scroll-row">
      <movie
        *ng-for="var movie of movieList; var $index = index"
        [model]="movie | async"></movie>
    </div>
  </div>
  `
})
export class GenreList {
  model: any
  id: any;
  movieList: Array<any>;
  constructor() {

  }
  onChange(changes) {
    if (!this.model) return;
    this.movieList = [
      this.model.bind(['titles', 0], 'name'),
      this.model.bind(['titles', 1], 'name'),
      this.model.bind(['titles', 2], 'name'),
      this.model.bind(['titles', 3], 'name'),
      this.model.bind(['titles', 4], 'name'),
      this.model.bind(['titles', 5], 'name'),
      this.model.bind(['titles', 6], 'name'),
      this.model.bind(['titles', 7], 'name'),
    ];
  }

}



@Component({
  selector: 'movies',
  properties: ['model: model']
})
@View({
  directives: [ routerDirectives, coreDirectives, appDirectives, GenreList ],
  template: `
  <div *ng-if="genresList">
    <genre-list
      *ng-for="var genre of genresList; var $index = index"
      [model]="genre | async"></genre-list>
  </div>
  `
})
export class Movies {
  genresList: Array<any>;
  constructor(public model: FalcorModel) {

    this.genresList = [
      this.model.bind(['genres', 0], 'name'),
      this.model.bind(['genres', 1], 'name'),
      this.model.bind(['genres', 2], 'name'),
      this.model.bind(['genres', 3], 'name')
    ];

  }

}



@Component({
  selector: 'app',
  lifecycle: [onChange]
})
@View({
  directives: [ routerDirectives, coreDirectives, appDirectives ],
  template: `
  <style>
    .title  { font-family: Arial, Helvetica, sans-serif; }
    .nav    { display: inline; list-style-type: none; padding: 0;  background-color: #F8F8F8; }
    .nav li { display: inline; }
    main    { padding: 0.5em; }
  </style>
  <navbar>
    <a router-link="app">
      Angular 2 + FalcorJS
    </a>

    <ul class="nav">
      <li>
        Search
      </li>
      |
      <li>
        <a router-link="movies">Movies</a>
      </li>
      |
      <li>
        Profile
      </li>
    </ul>
  </navbar>

  <main>
    <router-outlet></router-outlet>
  </main>
  `
})
@RouteConfig([
  { path: '/',            as: 'app',     component: Movies },
  { path: '/movies',      as: 'movies',  component: Movies },
  { path: '/details/:id/:path', as: 'details', component: MovieDetails },
])
export class App {
  constructor(public model: FalcorModel) {

  }
}
