var di_1 = require('angular2/di');
var lang_1 = require('angular2/src/facade/lang');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var compiler_1 = require('angular2/src/core/compiler/compiler');
var reflection_1 = require('angular2/src/reflection/reflection');
var change_detection_1 = require('angular2/change_detection');
var exception_handler_1 = require('angular2/src/core/exception_handler');
var template_loader_1 = require('angular2/src/render/dom/compiler/template_loader');
var template_resolver_1 = require('angular2/src/core/compiler/template_resolver');
var directive_resolver_1 = require('angular2/src/core/compiler/directive_resolver');
var collection_1 = require('angular2/src/facade/collection');
var async_1 = require('angular2/src/facade/async');
var ng_zone_1 = require('angular2/src/core/zone/ng_zone');
var life_cycle_1 = require('angular2/src/core/life_cycle/life_cycle');
var shadow_dom_strategy_1 = require('angular2/src/render/dom/shadow_dom/shadow_dom_strategy');
var emulated_unscoped_shadow_dom_strategy_1 = require('angular2/src/render/dom/shadow_dom/emulated_unscoped_shadow_dom_strategy');
var xhr_1 = require('angular2/src/services/xhr');
var xhr_impl_1 = require('angular2/src/services/xhr_impl');
var event_manager_1 = require('angular2/src/render/dom/events/event_manager');
var key_events_1 = require('angular2/src/render/dom/events/key_events');
var hammer_gestures_1 = require('angular2/src/render/dom/events/hammer_gestures');
var component_url_mapper_1 = require('angular2/src/core/compiler/component_url_mapper');
var url_resolver_1 = require('angular2/src/services/url_resolver');
var style_url_resolver_1 = require('angular2/src/render/dom/shadow_dom/style_url_resolver');
var style_inliner_1 = require('angular2/src/render/dom/shadow_dom/style_inliner');
var dynamic_component_loader_1 = require('angular2/src/core/compiler/dynamic_component_loader');
var testability_1 = require('angular2/src/core/testability/testability');
var view_pool_1 = require('angular2/src/core/compiler/view_pool');
var view_manager_1 = require('angular2/src/core/compiler/view_manager');
var view_manager_utils_1 = require('angular2/src/core/compiler/view_manager_utils');
var view_listener_1 = require('angular2/src/core/compiler/view_listener');
var proto_view_factory_1 = require('angular2/src/core/compiler/proto_view_factory');
var api_1 = require('angular2/src/render/api');
var dom_renderer_1 = require('angular2/src/render/dom/dom_renderer');
var view_1 = require('angular2/src/render/dom/view/view');
var compiler_2 = require('angular2/src/render/dom/compiler/compiler');
var view_ref_1 = require('angular2/src/core/compiler/view_ref');
var application_tokens_1 = require('angular2/src/core/application_tokens');
var _rootInjector;
var _rootBindings = [
    di_1.bind(reflection_1.Reflector).toValue(reflection_1.reflector),
    testability_1.TestabilityRegistry
];
function _injectorBindings(appComponentType) {
    return [
        di_1.bind(dom_renderer_1.DOCUMENT_TOKEN).toValue(dom_adapter_1.DOM.defaultDoc()),
        di_1.bind(appComponentType).toFactory(function (ref) { return ref.instance; }, [application_tokens_1.appComponentRefToken]),
        di_1.bind(life_cycle_1.LifeCycle).toFactory(function (exceptionHandler) { return new life_cycle_1.LifeCycle(exceptionHandler, null, lang_1.assertionsEnabled()); }, [exception_handler_1.ExceptionHandler]),
        di_1.bind(event_manager_1.EventManager).toFactory(function (ngZone) {
            var plugins = [new hammer_gestures_1.HammerGesturesPlugin(), new key_events_1.KeyEventsPlugin(), new event_manager_1.DomEventsPlugin()];
            return new event_manager_1.EventManager(plugins, ngZone);
        }, [ng_zone_1.NgZone]),
        di_1.bind(shadow_dom_strategy_1.ShadowDomStrategy).toFactory(function (styleUrlResolver, doc) { return new emulated_unscoped_shadow_dom_strategy_1.EmulatedUnscopedShadowDomStrategy(styleUrlResolver, doc.head); }, [style_url_resolver_1.StyleUrlResolver, dom_renderer_1.DOCUMENT_TOKEN]),
        di_1.bind(dom_renderer_1.DomRenderer).toFactory(function (eventManager, shadowDomStrategy, doc) { return new dom_renderer_1.DomRenderer(eventManager, shadowDomStrategy, doc); }, [event_manager_1.EventManager, shadow_dom_strategy_1.ShadowDomStrategy, dom_renderer_1.DOCUMENT_TOKEN]),
        compiler_2.DefaultDomCompiler,
        di_1.bind(api_1.Renderer).toAlias(dom_renderer_1.DomRenderer),
        di_1.bind(api_1.RenderCompiler).toAlias(compiler_2.DefaultDomCompiler),
        proto_view_factory_1.ProtoViewFactory,
        di_1.bind(view_pool_1.AppViewPool).toFactory(function (capacity) { return new view_pool_1.AppViewPool(capacity); }, [view_pool_1.APP_VIEW_POOL_CAPACITY]),
        di_1.bind(view_pool_1.APP_VIEW_POOL_CAPACITY).toValue(10000),
        view_manager_1.AppViewManager,
        view_manager_utils_1.AppViewManagerUtils,
        view_listener_1.AppViewListener,
        compiler_1.Compiler,
        compiler_1.CompilerCache,
        template_resolver_1.TemplateResolver,
        di_1.bind(change_detection_1.PipeRegistry).toValue(change_detection_1.defaultPipeRegistry),
        di_1.bind(change_detection_1.ChangeDetection).toClass(change_detection_1.DynamicChangeDetection),
        template_loader_1.TemplateLoader,
        directive_resolver_1.DirectiveResolver,
        change_detection_1.Parser,
        change_detection_1.Lexer,
        exception_handler_1.ExceptionHandler,
        di_1.bind(xhr_1.XHR).toValue(new xhr_impl_1.XHRImpl()),
        component_url_mapper_1.ComponentUrlMapper,
        url_resolver_1.UrlResolver,
        style_url_resolver_1.StyleUrlResolver,
        style_inliner_1.StyleInliner,
        dynamic_component_loader_1.DynamicComponentLoader,
        testability_1.Testability
    ];
}
function _createNgZone(givenReporter) {
    var defaultErrorReporter = function (exception, stackTrace) {
        var longStackTrace = collection_1.ListWrapper.join(stackTrace, "\n\n-----async gap-----\n");
        dom_adapter_1.DOM.logError(exception + "\n\n" + longStackTrace);
        throw exception;
    };
    var reporter = lang_1.isPresent(givenReporter) ? givenReporter : defaultErrorReporter;
    var zone = new ng_zone_1.NgZone({ enableLongStackTrace: lang_1.assertionsEnabled() });
    zone.initCallbacks({ onErrorHandler: reporter });
    return zone;
}
function bootstrap(appComponentType, appInjector, componentInjectableBindings, errorReporter) {
    if (appInjector === void 0) { appInjector = null; }
    if (componentInjectableBindings === void 0) { componentInjectableBindings = null; }
    if (errorReporter === void 0) { errorReporter = null; }
    var bootstrapProcess = async_1.PromiseWrapper.completer();
    var zone = _createNgZone();
    var bindingsCmpLoader = [dynamic_component_loader_1.DynamicComponentLoader, di_1.Injector, testability_1.Testability, testability_1.TestabilityRegistry];
    var componentLoader = function (dynamicComponentLoader, injector, testability, registry) {
        return dynamicComponentLoader.loadAsRoot(appComponentType, null, injector).then(function (componentRef) {
            var domView = view_1.resolveInternalDomView(componentRef.hostView.render);
            registry.registerApplication(domView.boundElements[0].element, testability);
            return componentRef;
        });
    };
    var serverBindings = [
        di_1.bind(application_tokens_1.appComponentTypeToken).toValue(appComponentType),
    ];
    var mergedBindings = lang_1.isPresent(componentInjectableBindings) ?
        collection_1.ListWrapper.concat(componentInjectableBindings, serverBindings) : serverBindings;
    if (!appInjector) {
        appInjector = _createAppInjector(appComponentType, mergedBindings, zone);
    }
    else {
        appInjector.resolveAndCreateChild(mergedBindings);
    }
    async_1.PromiseWrapper.then(async_1.PromiseWrapper.all([
        appInjector.asyncGet(dynamic_component_loader_1.DynamicComponentLoader),
        appInjector.asyncGet(testability_1.Testability),
        appInjector.asyncGet(testability_1.TestabilityRegistry)
    ])
        .then(function (results) {
        return componentLoader(results[0], appInjector, results[1], results[2]);
    }), function (componentRef) {
        var appChangeDetector = view_ref_1.internalView(componentRef.hostView).changeDetector;
        bootstrapProcess.resolve(new ApplicationRef(componentRef, appComponentType, appInjector, appChangeDetector));
    }, function (err, stackTrace) {
        bootstrapProcess.reject(err, stackTrace);
    });
    return bootstrapProcess.promise;
}
exports.bootstrap = bootstrap;
var ApplicationRef = (function () {
    function ApplicationRef(hostComponent, hostComponentType, injector, changeDetection) {
        this._hostComponent = hostComponent;
        this._injector = injector;
        this._hostComponentType = hostComponentType;
        this._changeDetection = changeDetection;
    }
    Object.defineProperty(ApplicationRef.prototype, "hostComponentType", {
        get: function () {
            return this._hostComponentType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationRef.prototype, "hostElementRef", {
        get: function () {
            return this._hostComponent.location;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationRef.prototype, "changeDetection", {
        get: function () {
            return this._changeDetection;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationRef.prototype, "hostComponent", {
        get: function () {
            return this._hostComponent.instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationRef.prototype, "injector", {
        get: function () {
            return this._injector;
        },
        enumerable: true,
        configurable: true
    });
    ApplicationRef.prototype.dispose = function () {
        this._injector = null;
        this._changeDetection = null;
        return this._hostComponent.dispose();
    };
    return ApplicationRef;
})();
exports.ApplicationRef = ApplicationRef;
function _createAppInjector(appComponentType, bindings, zone) {
    if (lang_1.isBlank(_rootInjector)) {
        _rootInjector = di_1.Injector.resolveAndCreate(_rootBindings);
    }
    var mergedBindings = lang_1.isPresent(bindings) ?
        collection_1.ListWrapper.concat(_injectorBindings(appComponentType), bindings) :
        _injectorBindings(appComponentType);
    collection_1.ListWrapper.push(mergedBindings, di_1.bind(ng_zone_1.NgZone).toValue(zone));
    return _rootInjector.resolveAndCreateChild(mergedBindings);
}
