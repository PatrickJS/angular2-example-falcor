import {Component, View} from 'angular2/angular2';
import {If, For} from 'angular2/directives';

import {ViewTeleporter} from 'app/ViewTeleporter';

@Component({
  selector: 'movie-details',
  properties: { model: 'model' },
  injectables: [ ViewTeleporter ]
})
@View({
  directives: [ If ],
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
  `
})
export class MovieDetails {
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
