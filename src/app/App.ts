/// <reference path="../../typings/tsd.d.ts" />

// Angular 2
import {Attribute, Directive, Component, View, onChange, onDestroy, onInit} from 'angular2/angular2';
import {bind, Inject} from 'angular2/di';
import {RouteConfig, Router, RouteParams, Location} from 'angular2/router';

import * as Rx from 'rx';

// Import all of our custom app directives
import {coreDirectives} from 'angular2/directives';
// import {routerDirectives} from 'angular2/router';
import {routerDirectives, RouterLink, RouterOutlet} from '../patch_angular2/router';
// App
import {appDirectives} from './directives/directives';

// Falcor
import {FalcorModel} from '../common/FalcorModel';
// import {FalcorView} from 'falcor-angular';


// Components
import {Rating} from './components/Rating';


// // Components

// /*

// */

// @Component({
//   selector: 'movie-details'
// })
// @View({
//   directives: [ coreDirectives, appDirectives, Rating ],
//   template: `
//   <div>

//     <button (click)="location.back()">Back</button>

//     <h3>{{ model?.getValue('name') | async }}</h3>

//     <hr>
//     <div class="side-details">
//       <div>
//         <img [src]="(model?.getValue('img') | async) || '' ">
//       </div>
//       <b>Rating</b>: <rating [rate]="model?.getValue('rating') | async" (click)="onRating($event)")></rating>
//     </div>

//     <div class="movie-copy">
//       <p>
//         {{ model?.getValue('copy') | async }}
//       </p>
//       <ul>
//         <li>
//           <b>Starring</b>: {{ model?.getValue('starring') | async }}
//         </li>
//         <li>
//           <b>Genres</b>: {{ model?.getValue('genres') | async }}
//         </li>
//       <ul>
//     </div>

//   <div>
//   `
//   //   </div>
//   // </div>
// })
// @RouteConfig({
//   path: '/details/:id/:path', as: 'details', component: MovieDetails
// })
// export class MovieDetails {
//   _subscription: any;
//   path: string;
//   model: any;
//   state: any = {};
//   constructor(
//     // public router: Router,
//     public routeParams: RouteParams,
//     public falcorModel: FalcorModel,
//     public location: Location) {

//     if (routeParams.get('path')) {
//       // problably could be refactored into a client version of falcor-router
//       this.path = this.getUrlPath(routeParams.get('path'));
//       this._subscription = this.falcorModel.
//         bind(this.path, 'name').
//         subscribe(model => this.model = model);
//     }//routeParams

//   }
//   getUrlPath(path) {
//     return JSON.parse(decodeURIComponent(path));
//   }

//   onRating(event) {
//     console.log('onRating', event);
//   }
// }



// @Component({
//   selector: 'movie',
//   properties: ['model'],
// })
// @View({
//   directives: [ routerDirectives, coreDirectives, appDirectives ],
//   template: `
//   <div class="movie">
//     <a router-link="details" [router-params]="{
//       'id':   (model?.getValue('id') | async),
//       'path': stringify(model?.toJSON()?.value)
//     }">

//       <img [src]="model?.getValueSync('img')" class="boxShotImg movie-box-image">

//     </a>
//   </div>
//   `
// })
// export class Movie {
//   stringify(str) {
//     // return encodeURIComponent(JSON.stringify(str));
//     return JSON.stringify(str);
//   }
//   constructor(public router: Router) {
//   }

// }


@Component({
  selector: 'genre-list',
  properties: ['model', 'size'],
  lifecycle: [onChange]
})
@View({
  directives: [ /*routerDirectives,*/ coreDirectives, appDirectives/*, Movie, MovieDetails*/ ],
  template: `
  <div>
    <h2 class="genre-name">
    </h2>
    <div class="scroll-row">
      <movie></movie>
    </div>
  </div>
  `
})
export class GenreList {
  model: any
  id: any;
  movieList: Array<any>;
  constructor(@Attribute('size') public size: string) {

  }
  onChange(changes) {
    if (!this.model) return;
    this.movieList = new Array(Number(8));
  }

}












@Component({
  selector: 'movies'
})
@View({
  directives: [ /*routerDirectives, */coreDirectives, appDirectives, GenreList ],
  template: `
  <div>
    <genre-list [model]="model?.bind(['genres', 0], 'name')"></genre-list>
  </div>
  `
})
export class Movies {
  genresList: Array<any>;
  constructor(public model: FalcorModel) {
    this.genresList = [1,2,3,4];

  }

}

import {routerInjectables} from '../patch_angular2/router';
import {falcorInjectibles} from '../common/FalcorModel';
import {rxPipeRegistry} from '../common/rxPipeRegistry';



@Component({
  selector: 'app',
  appInjector: [routerInjectables, falcorInjectibles, rxPipeRegistry]
})
@View({
  directives: [ /*routerDirectives, */coreDirectives, appDirectives, Movies, RouterOutlet ],
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
    <movies></movies>
  </main>
  `
})
@RouteConfig([
  // { path: '/',            as: 'app',     component: Movies },
  // { path: '/movies',      as: 'movies',  component: Movies },
  // { path: '/details/:id/:path', as: 'details', component: MovieDetails },
])
export class App {
  constructor() {
    console.log('Angular2 + FalcorJS');

  }
}
