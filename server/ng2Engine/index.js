/// <reference path="../../typings/tsd.d.ts" />
var fs = require('fs');
var angular2_server_1 = require('../angular2_server');
var helper_1 = require('./helper');
var stringifyElement_1 = require('./stringifyElement');
var angular2_1 = require('angular2/angular2');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var directive_resolver_1 = require('angular2/src/core/compiler/directive_resolver');
var serverInjector = undefined;
var serverDocument = dom_adapter_1.DOM.createHtmlDocument();
var serverDirectiveResolver = new directive_resolver_1.DirectiveResolver();
function readNgTemplate(content, AppComponent, options) {
    var annotations = serverDirectiveResolver.resolve(AppComponent);
    var selector = annotations.selector;
    if (options.clientOnly) {
        return Promise.resolve(content.toString());
    }
    var el = dom_adapter_1.DOM.createElement(selector, serverDocument);
    dom_adapter_1.DOM.appendChild(serverDocument.body, el);
    return Promise.resolve(angular2_server_1.bootstrap(AppComponent, serverInjector, [
        angular2_1.bind(angular2_1.DOCUMENT_TOKEN).toValue(serverDocument),
    ]))
        .then(function (appRef) {
        if (!serverInjector && appRef.injector) {
            serverInjector = appRef.injector;
        }
        appRef.changeDetection.detectChanges();
        var el = appRef.hostElementRef.domElement;
        var serializedCmp = stringifyElement_1.stringifyElement(el);
        var rendered = content.toString().replace(helper_1.selectorRegExpFactory(selector), serializedCmp);
        appRef.dispose();
        dom_adapter_1.DOM.removeChild(serverDocument.body, el);
        return rendered;
    })
        .catch(function (err) {
        debugger;
        throw err;
    });
}
exports.readNgTemplate = readNgTemplate;
function ng2Engine(filePath, options, done) {
    try {
        fs.readFile(filePath, function (err, content) {
            if (err) {
                return done(new Error(err));
            }
            readNgTemplate(content, options.Component, options)
                .then(function (rendered) { return done(null, rendered); })
                .catch(function (e) { return done(e); });
        });
    }
    catch (e) {
        done(e);
    }
}
exports.ng2Engine = ng2Engine;
;
