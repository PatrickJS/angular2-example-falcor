import {bootstrap} from 'angular2/angular2';
import {pipeInjectables} from 'pipes/pipes';

import {App} from 'app/app';

bootstrap(App, [
  // bind(Router).toValue(new RootRouter(new Pipeline())),
  pipeInjectables
]);