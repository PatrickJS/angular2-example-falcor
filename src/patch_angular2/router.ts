export {RouterLink} from './router/router_link';
export {RouterOutlet} from './router/router_outlet';

import {RouterLink} from './router/router_link';
import {RouterOutlet} from './router/router_outlet';

export var routerDirectives: Array<any> = [RouterOutlet, RouterLink];

// export {BrowserLocation} from './router/browser_location';
import {BrowserLocation} from 'angular2/src/router/browser_location';
// import {BrowserLocation} from './router/browser_location';
import {Router, RootRouter} from 'angular2/src/router/router';

import {Pipeline, Location, RouteRegistry, RouteParams} from 'angular2/router';

import {appComponentTypeToken} from 'angular2/src/core/application_tokens';
import {bind} from 'angular2/di';

export class MyRootRouter extends RootRouter {
  navigate: any;
  constructor(
    registry: RouteRegistry,
    pipeline: Pipeline,
    location: Location,
    hostComponent: any,
    browserLocation: BrowserLocation) {
    super(registry, pipeline, location, hostComponent);
    this.navigate(browserLocation.path());
  }
}


export var routerInjectables: Array<any> = [
  bind(RouteParams).toValue( new RouteParams({}) ),
  RouteRegistry,
  Pipeline,
  BrowserLocation,
  Location,
  bind(Router).toFactory(
    (registry, pipeline, location, appRoot, browserLocation) => {
      return new MyRootRouter(registry, pipeline, location, appRoot, browserLocation);
    },
    [RouteRegistry, Pipeline, Location, appComponentTypeToken, BrowserLocation]
  )
];
