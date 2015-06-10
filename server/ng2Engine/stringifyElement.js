var parse5_adapter_1 = require('angular2/src/dom/parse5_adapter');
parse5_adapter_1.Parse5DomAdapter.makeCurrent();
var collection_1 = require('angular2/src/facade/collection');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var lang_1 = require('angular2/src/facade/lang');
var singleTagWhitelist = {
    'br': true,
    'hr': true,
    'input': true
};
function stringifyElement(el) {
    var result = '';
    if (dom_adapter_1.DOM.isElementNode(el)) {
        var tagName = lang_1.StringWrapper.toLowerCase(dom_adapter_1.DOM.tagName(el));
        result += '<' + tagName;
        var attributeMap = dom_adapter_1.DOM.attributeMap(el);
        var keys = collection_1.ListWrapper.create();
        attributeMap.forEach(function (v, k) { collection_1.ListWrapper.push(keys, k); });
        collection_1.ListWrapper.sort(keys);
        if (keys.length) {
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                result += ' ' + key + '="' + collection_1.MapWrapper.get(attributeMap, key) + '"';
            }
        }
        result += '>';
        var children = dom_adapter_1.DOM.childNodes(dom_adapter_1.DOM.templateAwareRoot(el));
        if (children.length) {
            for (var i = 0; i < children.length; i++) {
                result += stringifyElement(children[i]);
            }
        }
        if (!singleTagWhitelist[tagName]) {
            result += '</' + tagName + '>';
        }
    }
    else {
        result = dom_adapter_1.DOM.getText(el);
    }
    return result;
}
exports.stringifyElement = stringifyElement;
