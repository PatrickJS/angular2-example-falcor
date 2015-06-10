function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
exports.escapeRegExp = escapeRegExp;
function stringify(obj, replacer, spaces) {
    if (replacer === void 0) { replacer = null; }
    if (spaces === void 0) { spaces = 2; }
    return JSON.stringify(obj, replacer, spaces);
}
exports.stringify = stringify;
function showDebug(options) {
    if (options === void 0) { options = {}; }
    var info = '\n';
    for (var prop in options) {
        if (prop && options[prop]) {
            info += '' +
                '<pre>' +
                (prop + " = " + stringify(options[prop])) +
                '</pre>';
        }
    }
    return info;
}
exports.showDebug = showDebug;
function getHostElementRef(appRef) {
    return appRef._hostComponent.location.domElement;
}
exports.getHostElementRef = getHostElementRef;
function selectorRegExpFactory(selector) {
    /*
          $1       $2        $3
      <selector> content </selector>
    */
    var regExpSelector = "(<" + escapeRegExp(selector) + ">)((?:.|\\n)*?)(</" + escapeRegExp(selector) + ">)";
    return new RegExp(regExpSelector);
}
exports.selectorRegExpFactory = selectorRegExpFactory;
