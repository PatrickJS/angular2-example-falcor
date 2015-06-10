/// <reference path="../typings/tsd.d.ts" />

// Angular 2
import {bootstrap} from 'angular2/angular2';


// include any injectables
// import {routerInjectables} from 'angular2/router';
import {routerInjectables} from './patch_angular2/router';
// App
import {appServicesInjectables} from './app/services/services';
// import {shadowDomInjectables} from 'common/shadowDomInjectables';
// import {jitInjectables} from 'common/jitInjectables';
import {falcorInjectibles} from './common/FalcorModel';

import {rxPipeRegistry} from './common/rxPipeRegistry';

// import {initialCache} from 'common/initialCache';

// Top level component to bootstrap
import {App} from './app/App';

// bootstrap the Angular app with bindings
bootstrap(App, [
  falcorInjectibles,

  routerInjectables,

  // shadowDomInjectables,

  // jitInjectables,

  appServicesInjectables,

  rxPipeRegistry
]);
