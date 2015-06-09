///<reference path="../es6-promise/es6-promise.d.ts"/>
///<reference path="../rx/rx.d.ts"/>
declare var require: any;
declare var __filename: string;
declare var __dirname: string;
declare var global: any;
declare var zone: any;
declare var Zone: any;

interface ObjectConstructor {
  assign(target: any, ...sources: any[]): any;
}

declare module "angular2/angular2" {
}

declare module "angular2/src/router/router" {
  class Router {}
  class RootRouter {
    constructor(registry: any, pipeline: any, location: any , appRoot: any)
  }
}

declare module "angular2/src/router/route_registry" {
  class RouteRegistry {}
}

declare module "angular2/src/router/pipeline" {
  class Pipeline {}
}

declare module "angular2/src/core/application_tokens" {
  var appComponentTypeToken: any;
}

declare module "angular2/src/facade/lang" {
  function isPresent(any:any):any
  function isBlank(any:any):any
}

declare module "angular2/src/dom/dom_adapter" {
  class DOM {
    static getLocation(...args): any;
    static getHistory(...args): any;
    static getBaseHref(...args): any;
    static getGlobalEventTarget(...args): any;
    static onAndCancel(...args): any;
    static preventDefault(event: any):any
    static setAttribute(...args: any[]):any
    static on(...args): any
  }
}

declare module "angular2/src/facade/collection" {
  class StringMap {}
  class StringMapWrapper {
    static create(...args): any
  }
}

declare module "angular2/src/router/instruction" {
  class Instruction {
    component: any;
    params: any;
    reuse: any;
  }
}

declare module "angular2/src/core/zone/ng_zone" {
  class NgZone {
    run(fn: Function): any
    runOutsideAngular(func: Function): any
  }
}

declare module "angular2/src/change_detection/change_detection" {
  var async: any;
}

declare module "angular2/change_detection" {
  class Pipe {}
  class NullPipeFactory {}
  class PipeRegistry {
    constructor(pipes: any)
  }
  class PipeFactory {}

  class JitChangeDetection {}
  class ChangeDetection {}
  class DynamicChangeDetection {}
  class WrappedValue {
    static wrap(...args): any
  }
  class ChangeDetectorRef {
    requestCheck(): void;
  }
  var defaultPipes: any;
}

declare module "angular2/pipes" {
  class ObservablePipe {
    _subscription: any;
    _observable: any;
    constructor(ref: any)
    _updateLatestValue(value: any): void;
    _subscribe(obs: any): any;
    _dispose(): void
    supports(oobs: any): boolean;
    onDestroy(): void
  }
}

declare module "angular2/src/change_detection/pipes/pipe" {
  class PipeFactory {
    constructor(pipes: any)
  }
  class Pipe {}
  class WrappedValue {
    static wrap(...args): any
  }
}

declare module 'angular2/src/services/url_resolver' {
  class UrlResolver {}
}

declare module "angular2/src/facade/async" {
  class Observable {
    observer(generator: any): Object;
  }


  /**
   * Use Rx.Observable but provides an adapter to make it work as specified here:
   * https://github.com/jhusain/observable-spec
   *
   * Once a reference implementation of the spec is available, switch to it.
   */
  class EventEmitter extends  Observable {
    next(value);
    observer(generator);
    return(value);
    throw(error);
    toRx(): Rx.Observable<any>;
  }
  class PromiseWrapper {
    static resolve(any:any):any
    static reject(any:any, arg:any):any
    static then(promise:any, callback: any):any
    static completer(): any;

  }
  class Promise {

  }
}

declare module "angular2/src/render/dom/shadow_dom/style_url_resolver" {
  class StyleUrlResolver {}
}

declare module "angular2/src/core/life_cycle/life_cycle" {
  class LifeCycle {
    tick(): any;
  }
}

declare module "zone.js" {
  var zone: any;
  var Zone: any;
}

declare module "angular2/directives" {
  function NgSwitch(): void;
  function NgSwitchWhen(): void;
  function NgSwitchDefault(): void;
  function NgNonBindable(): void;
  function NgIf(): void;
  function NgFor(): void;

  var formDirectives: any;
  var coreDirectives: any;

}

declare module "angular2/forms" {
  var formDirectives: any;
  class FormBuilder {
    group(controls: any): any;
  }
  class Control {
    constructor(controls: any)
    updateValue(value: any)
  }
  class ControlArray {
    removeAt(index: any)
    push(item: any)
  }
  class ControlGroup {
    constructor(controls: any)
    controls: any;
    valueChanges: any;
  }
}

declare module "angular2/core" {
  class NgZone {}
  class ProtoViewRef {}
  class ViewContainerRef {
    create(protoView: any): any;
    clear(): void;
  }
}


declare module "angular2/render" {
  class EmulatedScopedShadowDomStrategy {
    constructor(styleInliner: any, styleUrlResolver: any, styleHost: any)
  }
  class EmulatedUnscopedShadowDomStrategy {
    constructor(styleUrlResolver: any, styleHost: any)
  }
  class NativeShadowDomStrategy {
    constructor(styleUrlResolver: any)
  }
  class ShadowDomStrategy {}
}

declare module "angular2/src/facade/browser" {
  var __esModule: boolean;
  var win: any;
  var document: any;
  var location: any;
  var gc: () => void;
  const Event: any;
  const MouseEvent: any;
  const KeyboardEvent: any;
  class EventListener {}
  class History {
    pushState(...args): any;
    forward():any
    back(): any
  }
  class Location {
    pathname: any;
  }
}

declare module "angular2/src/router/browser_location" {
  class BrowserLocation {
    path(): string
  }
}

declare module "angular2/src/router/location" {
  class Location {
    normalizeAbsolutely(...args): any;
    normalize(url: string): string
    forward(): void;
    back(): void;
    path(): any;
    subscribe(...args): any
  }
}

declare module "angular2/router" {
  class Instruction {}
  class Router {
    parent: any;
    commit(any: any): any;
    navigate(url: string): Promise<any>;
    config(config: any): Promise<any>;
    deactivate(): Promise<any>;
    activate(instruction: Instruction): Promise<any>;
    recognize(url: string): Instruction;
    recognize(url: string): Instruction;
    renavigate(): Promise<any>;
    generate(name:string, params:any): string;
    subscribe(onNext: Function): void;
    registerOutlet(context: any, name: any):any;
    childRouter: any
  }
  class RootRouter {
    constructor(registry: any, pipeline: any, location: any , appRoot: any)
    navigate(url: string): Promise<any>;
  }
  class Location {
    normalizeAbsolutely(...args): any;
    normalize(url: string): string
    forward(): void;
    back(): void;
    path(): any;
    subscribe(...args): any
  }
  class RouteParams {
    constructor(params: any)
    get(param: string): string;
    params: any;
  }
  class RouteRegistry {}
  class Pipeline {}
  var RouterOutlet: any;
  var RouterLink: any;
  var routerInjectables: Array<any>;
  var routerDirectives: Array<any>;
  var RouteConfigAnnotation: any;
  var RouteConfig: any;
}


declare module "angular2/src/dom/browser_adapter" {
    class BrowserDomAdapter {
        static makeCurrent(): void;
        logError(error: any): void;
        attrToPropMap: any;
        query(selector: string): any;
        querySelector(el: any, selector: string): Node;
        querySelectorAll(el: any, selector: string): List<any>;
        on(el: any, evt: any, listener: any): void;
        onAndCancel(el: any, evt: any, listener: any): Function;
        dispatchEvent(el: any, evt: any): void;
        createMouseEvent(eventType: string): MouseEvent;
        createEvent(eventType: any): Event;
        getInnerHTML(el: any): any;
        getOuterHTML(el: any): any;
        nodeName(node: Node): string;
        nodeValue(node: Node): string;
        type(node: HTMLInputElement): string;
        content(node: Node): Node;
        firstChild(el: any): Node;
        nextSibling(el: any): Node;
        parentElement(el: any): any;
        childNodes(el: any): List<Node>;
        childNodesAsList(el: any): List<any>;
        clearNodes(el: any): void;
        appendChild(el: any, node: any): void;
        removeChild(el: any, node: any): void;
        replaceChild(el: Node, newChild: any, oldChild: any): void;
        remove(el: any): any;
        insertBefore(el: any, node: any): void;
        insertAllBefore(el: any, nodes: any): void;
        insertAfter(el: any, node: any): void;
        setInnerHTML(el: any, value: any): void;
        getText(el: any): any;
        setText(el: any, value: string): void;
        getValue(el: any): any;
        setValue(el: any, value: string): void;
        getChecked(el: any): any;
        setChecked(el: any, value: boolean): void;
        createTemplate(html: any): HTMLElement;
        createElement(tagName: any, doc?: Document): HTMLElement;
        createTextNode(text: string, doc?: Document): Text;
        createScriptTag(attrName: string, attrValue: string, doc?: Document): HTMLScriptElement;
        createStyleElement(css: string, doc?: Document): HTMLStyleElement;
        createShadowRoot(el: HTMLElement): DocumentFragment;
        getShadowRoot(el: HTMLElement): DocumentFragment;
        getHost(el: HTMLElement): HTMLElement;
        clone(node: Node): Node;
        hasProperty(element: any, name: string): boolean;
        getElementsByClassName(element: any, name: string): any;
        getElementsByTagName(element: any, name: string): any;
        classList(element: any): List<any>;
        addClass(element: any, classname: string): void;
        removeClass(element: any, classname: string): void;
        hasClass(element: any, classname: string): any;
        setStyle(element: any, stylename: string, stylevalue: string): void;
        removeStyle(element: any, stylename: string): void;
        getStyle(element: any, stylename: string): any;
        tagName(element: any): string;
        attributeMap(element: any): any;
        hasAttribute(element: any, attribute: string): any;
        getAttribute(element: any, attribute: string): any;
        setAttribute(element: any, name: string, value: string): void;
        removeAttribute(element: any, attribute: string): any;
        templateAwareRoot(el: any): any;
        createHtmlDocument(): Document;
        defaultDoc(): Document;
        getBoundingClientRect(el: any): any;
        getTitle(): string;
        setTitle(newTitle: string): void;
        elementMatches(n: any, selector: string): boolean;
        isTemplateElement(el: any): boolean;
        isTextNode(node: Node): boolean;
        isCommentNode(node: Node): boolean;
        isElementNode(node: Node): boolean;
        hasShadowRoot(node: any): boolean;
        isShadowRoot(node: any): boolean;
        importIntoDoc(node: Node): Node;
        isPageRule(rule: any): boolean;
        isStyleRule(rule: any): boolean;
        isMediaRule(rule: any): boolean;
        isKeyframesRule(rule: any): boolean;
        getHref(el: Element): string;
        getEventKey(event: any): string;
        getGlobalEventTarget(target: string): EventTarget;
        getHistory(): History;
        getLocation(): Location;
        getBaseHref(): any;
    }
}


declare module "angular2/di" {

  function bind(token: any): any;
  class Injector {
     parent: any;
     resolveAndCreateChild(bindings: [any]): Injector;
     asyncGet(bindings: any): any;
     get(bindings: any): any
     getOptional(any: any): any;
     createChildFromResolved(bindings: any): any;
  }
  var Binding: any;
  var ResolvedBinding: any;
  var Dependency: any;
  var Key: any;
  var KeyRegistry: any;
  var TypeLiteral: any;
  var NoBindingError: any;
  var AbstractBindingError: any;
  var AsyncBindingError: any;
  var CyclicDependencyError: any;
  var InstantiationError: any;
  var InvalidBindingError: any;
  var NoAnnotationError: any;
  var OpaqueToken: any;
  var ___esModule: any;
  var InjectAnnotation: any;
  var InjectPromiseAnnotation: any;
  var InjectLazyAnnotation: any;
  var OptionalAnnotation: any;
  var InjectableAnnotation: any;
  var DependencyAnnotation: any;
  var Inject: any;
  var InjectPromise: any;
  var InjectLazy: any;
  var Optional: any;
  var Injectable: any;
}
