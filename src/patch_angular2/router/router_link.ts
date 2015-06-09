import {Directive, ElementRef, onAllChangesDone, onDestroy} from 'angular2/angular2';
import {StringMap, StringMapWrapper} from 'angular2/src/facade/collection';

import {isPresent} from 'angular2/src/facade/lang';
import {DOM} from 'angular2/src/dom/dom_adapter';

import {Router, Location} from 'angular2/router';

/**
 * The RouterLink directive lets you link to specific parts of your app.
 *
 *
 * Consider the following route configuration:

 * ```
 * @RouteConfig({
 *   path: '/user', component: UserCmp, alias: 'user'
 * });
 * class MyComp {}
 * ```
 *
 * When linking to a route, you can write:
 *
 * ```
 * <a router-link="user">link to user component</a>
 * ```
 *
 * @exportedAs angular2/router
 */
@Directive({
  selector: '[router-link]',
  properties: ['route: routerLink', 'params: routerParams'],
  hostListeners: {
    '^click': 'onClick($event)'
  }
})
export class RouterLink {
  private _domEl;
  private _route: string;
  private _params: any;

  // the url displayed on the anchor element.
  _visibleHref: string;
  // the url passed to the router navigation.
  _navigationHref: string;

  constructor(elementRef: ElementRef, private _router: Router, private _location: Location) {
    this._domEl = elementRef.domElement;
    this._params = StringMapWrapper.create();
  }

  set route(changes: string) {
    this._route = changes;
  }

  set params(changes: any) {
    this._params = changes;
  }

  onClick(evt) {
    let router = isPresent(this._router.parent) ? this._router.parent : this._router;
    router.navigate(this._navigationHref);
    return false;
  }

  onAllChangesDone(): void {
    if (isPresent(this._route) && isPresent(this._params)) {
      try {
        let router = isPresent(this._router.parent) ? this._router.parent : this._router;
        this._navigationHref = router.generate(this._route, this._params);
        this._visibleHref = this._location.normalizeAbsolutely(this._navigationHref);
      } catch(e) {
        debugger;
      }
      // Keeping the link on the element to support contextual menu `copy link`
      // and other in-browser affordances.
      if (isPresent(this._visibleHref)) {
        DOM.setAttribute(this._domEl, 'href', this._visibleHref);
      }
    }
  }
}
