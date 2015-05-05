import {Component, View, Attribute, onChange, NgElement} from 'angular2/angular2';
import {If, For} from 'angular2/directives';

import falcor from 'falcor';
import XMLHttpSource from 'falcor-browser';

import {ViewTeleporter} from 'app/ViewTeleporter';
import {state} from 'app/state';

import {Scrollable, Scroller} from 'app/services/scrollable';

import {MovieDetails} from 'app/components/movie_details';
import {GenreList} from 'app/components/genre_list';



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
      <genre-list *for="var genre of state.genresList" [model]="genre | async" page-size="12"></genre-list>
    </div>
  </main>


  `,
  directives: [ If, For, GenreList, MovieDetails, Scroller ]
})
export class App {

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
    this.details = true;

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
