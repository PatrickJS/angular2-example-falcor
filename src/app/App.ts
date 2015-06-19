/// <reference path="../../typings/tsd.d.ts" />

// Angular 2
import {Attribute, Directive, Component, View, onChange, onDestroy, onInit, ON_PUSH} from 'angular2/angular2';
import {bind, Inject} from 'angular2/di';
import {RouteConfig, Router, RouteParams, Location} from 'angular2/router';

import * as Rx from 'rx';

// Import all of our custom app directives
import {coreDirectives} from 'angular2/directives';
// import {routerDirectives} from 'angular2/router';
import {routerDirectives} from '../patch_angular2/router';
// App
import {appDirectives} from './directives/directives';

// Falcor
import {FalcorModel} from '../common/FalcorModel';
// import {FalcorView} from 'falcor-angular';

// Components
import {Rating} from './components/Rating';

@Component({
  selector: 'movie-details'
})
@View({
  directives: [ coreDirectives, appDirectives, Rating ],
  template: `
  <div>

    <button (click)="location.back()">Back</button>

    <h3>{{ model?.getValue('name') | async }}</h3>

    <hr>
    <div class="side-details">
      <div>
        <img [src]="(model?.getValue('img') | async) || '' ">
      </div>
      <b>Rating</b>: <rating [rate]="model?.getValue('rating') | async" (click)="onRating($event)")></rating>
    </div>

    <div class="movie-copy">
      <p>
        {{ model?.getValue('copy') | async }}
      </p>
      <ul>
        <li>
          <b>Starring</b>: {{ model?.getValue('starring') | async }}
        </li>
        <li>
          <b>Genres</b>: {{ model?.getValue('genres') | async }}
        </li>
      <ul>
    </div>

  <div>
  `
})
@RouteConfig({
  path: '/details/:id/:path', as: 'details', component: MovieDetails
})
export class MovieDetails {
  path: string;
  model: any;
  constructor(
    public routeParams: RouteParams,
    public falcorModel: FalcorModel,
    public location: Location) {

    if (routeParams.get('path')) {
      // problably could be refactored into a client version of falcor-router
      this.path = this.getUrlPath(routeParams.get('path'));
      this.falcorModel.
        bind(this.path, 'name').
        subscribe(model => this.model = model);
    }//routeParams

  }
  getUrlPath(path) {
    return JSON.parse(decodeURIComponent(path));
  }

  onRating(event) {
    console.log('onRating', event);
    this.falcorModel.set({
      path:  [].concat(this.path, 'rating'),
      value: event.count
    })
    .then(res => console.log(res))
  }
}



@Component({
  selector: 'movie',
  // changeDetection: ON_PUSH,
  properties: ['model']
})
@View({
  directives: [ routerDirectives, coreDirectives, appDirectives ],
  template: `
  <div class="movie">
    <a router-link="details" [router-params]="{
      'id':   (model?.getValue('id') | async),
      'path': stringify(model?.toJSON()?.value)
    }">

      <img [src]="(model?.getValue('img') | async) || '' " class="boxShotImg movie-box-image">

    </a>
  </div>
  `
})
export class Movie {
  stringify(str) {
    // return encodeURIComponent(JSON.stringify(str));
    return JSON.stringify(str);
  }

  constructor(public router: Router) {
  }

}


@Component({
  selector: 'genre-list',
  // changeDetection: ON_PUSH,
  properties: ['model', 'size'],
  lifecycle: [onInit]
})
@View({
  directives: [ routerDirectives, coreDirectives, appDirectives, Movie, MovieDetails ],
  template: `
  <div>
    <h2 class="genre-name">
      {{ model?.getValue('name') | async }}
    </h2>
    <div class="scroll-row">
      <movie
        *ng-for="var movie of movieList; var $index = index"
        [model]="model?.bind(['titles', $index], 'img') | async">
      </movie>
    </div>
  </div>
  `
})
export class GenreList {
  model: any
  movieList: Array<any>;
  constructor(@Attribute('size') public size: string) {

  }

  onInit() {
    this.movieList = new Array(Number(this.size));
  }

}



@Component({
  selector: 'movies',
})
@View({
  directives: [ routerDirectives, coreDirectives, appDirectives, GenreList ],
  template: `
  <div>
    <genre-list
      *ng-for="var genre of genresList; var $index = index"
      size="8"
      [model]="model?.bind(['genres', $index], 'name') | async">
    </genre-list>
  </div>
  `
})
export class Movies {
  genresList: Array<any>;
  constructor(public model: FalcorModel) {

    this.genresList = new Array(4);

  }

}



@Component({
  selector: 'app'
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
  { path: '/', redirectTo: '/browse' },
  { path: '/browse',          as: 'app',     component: Movies },
  { path: '/movies',        as: 'movies',  component: Movies },
  { path: '/details/:path', as: 'details', component: MovieDetails },
])
export class App {
  constructor() {

  }
}
