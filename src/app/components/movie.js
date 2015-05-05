import {Component, View} from 'angular2/angular2';
import {If} from 'angular2/directives';

import {ViewTeleporter} from 'app/ViewTeleporter';


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
export class Movie {
  constructor(router: ViewTeleporter) {
    this.router = router;
  }
  details(model) {
    this.router.details(model);
  }
}
