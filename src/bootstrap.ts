/// <reference path="../typings/tsd.d.ts" />

// Angular 2
import {bootstrap} from 'angular2/angular2';

// include any injectables
import {routerInjectables} from 'angular2/router';

// App
import {appServicesInjectables} from './app/services/services';
import {nativeShadowDomInjectables} from './common/shadowDomInjectables';
import {dynamicInjectables} from './common/changeDetectionInjectables';
import {falcorInjectibles} from './common/FalcorModel';

import {rxPipeRegistry} from './common/rxPipeRegistry';

// import {initialCache} from 'common/initialCache';

// Top level component to bootstrap
import {App} from './app/App';


// bootstrap the Angular app with bindings
bootstrap(App, [
  falcorInjectibles,

  routerInjectables,

  // nativeShadowDomInjectables,

  dynamicInjectables,

  appServicesInjectables,

  rxPipeRegistry
]);
