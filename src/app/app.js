import {Component, View, Decorator, ViewPort, onChange} from 'angular2/angular2';
import {If, For, Switch, SwitchWhen, SwitchDefault} from 'angular2/directives';
import {bootstrap, NgElement} from 'angular2/angular2';
import {RootRouter} from 'angular2/src/router/router';
import {Pipeline} from 'angular2/src/router/pipeline';
import {Router} from 'angular2/router';
import {bind} from 'angular2/di';
import {PipeRegistry} from 'angular2/change_detection';

import falcor from 'falcor';

import {ViewTeleporter} from 'app/ViewTeleporter';
import {state} from 'app/state';
import {pipes} from 'app/pipes/pipes';


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
  <div class="movie">
    <a (^click)="details(model)" [href]="'#/'+ (model.getValue('name') | async)" >
      <img [src]="model.getValue('img') | async" class="boxShotImg movie-box-image">
    </a>
  </div>
  `,
  directives: []
})
class Movie {
  constructor(router: ViewTeleporter) {
    this.router = router;
  }
  details(model) {
    this.router.details(model);
  }
}


@Component({
  selector: 'genres-list',
  properties: {
    model: 'model'
  }
})
@View({
  template: `
  <h2 class="genre-name">
    {{ model.getValue('name') | async }}
  </h2>
  <div class="scroll-row">
    <movie [model]="model.bind('titles[0]', 'name') | async"></movie>
    <movie [model]="model.bind('titles[1]', 'name') | async"></movie>
    <movie [model]="model.bind('titles[2]', 'name') | async"></movie>
    <movie [model]="model.bind('titles[3]', 'name') | async"></movie>
    <movie [model]="model.bind('titles[4]', 'name') | async"></movie>
    <movie [model]="model.bind('titles[5]', 'name') | async"></movie>
    <movie [model]="model.bind('titles[6]', 'name') | async"></movie>
    <movie [model]="model.bind('titles[7]', 'name') | async"></movie>
  <div>
  `,
  directives: [ Movie ]
})
class GenreList {}

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


    <div *if="!details">
      <genres-list [model]="model.bind('genres[0]', 'name') | async"></genres-list>
      <genres-list [model]="model.bind('genres[1]', 'name') | async"></genres-list>
      <genres-list [model]="model.bind('genres[2]', 'name') | async"></genres-list>
      <genres-list [model]="model.bind('genres[3]', 'name') | async"></genres-list>
    </div>
  </main>


  `,
  directives: [ If, GenreList, MovieDetails ]
})
class App {
  constructor(router: ViewTeleporter) {
    // FalcorModel
    var model = new falcor.Model({
      cache: state
    });
    this.model = model;


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
  bind(PipeRegistry).toValue(new PipeRegistry(pipes))
]);
