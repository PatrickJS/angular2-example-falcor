/*

TODO:
allow [value] and [checked] bindings
figure out eventManager bug

*/
function isObject(value) {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
}
var hasAttrValue = {
    'class': true,
    'id': true,
    'style': true,
    'for': true,
    'href': true,
    'type': true,
    'placeholder': true,
    'rel': true,
    'media': true,
    'title': true,
    'charset': true,
    'select': true
};
function openTag(node) {
    var attributes = node.attribs;
    var tag = '<' + node.name;
    if (attributes) {
        tag += ' ';
        for (var attr in attributes) {
            if (hasAttrValue[attr]) {
                tag = tag + (attr + '="' + attributes[attr] + '"');
            }
            else if (attr[0] === '[' && attr[attr.length - 1] === ']') {
            }
            else if (attr[0] === '[' && attr[1] === '(') {
            }
            else if (attr[0] === '#') {
            }
            else if (attr[0] === '*') {
            }
            else {
                tag = tag + ' ' + attr + ' ';
            }
        }
    }
    return (tag + '>').replace(' >', '>');
}
function closeTag(node) {
    if (!node || !node.name)
        return '';
    var tag = node.name.toLowerCase();
    return '</' + tag + '>';
}
function logValue(node, type) {
    if (!node)
        return '';
    try {
        if (node.type && node.type === 'tag' || node.type === 'style' || node.type === 'script') {
            if (type === 0) {
                return openTag(node);
            }
            else if (type === 1) {
                return closeTag(node);
            }
        }
        else if (node.type === 'text') {
            if (node.data && type)
                return node.data || '';
            return '';
        }
        else {
            return '';
        }
    }
    catch (e) {
        console.log('WAT', e);
    }
}
var tagBlackList = {
    'template': true
};
function isTagBlackList(node) {
    if (!node)
        return !node;
    if (node.type && node.type === 'tag') {
        return !!tagBlackList[node.name];
    }
    return 0;
}
function traverseDom(nodes) {
    if (!nodes)
        return '';
    var newContent = '';
    if (Array.isArray(nodes)) {
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (!isTagBlackList(node)) {
                newContent += logValue(node, 0);
                if (node.children && node.children.length) {
                    newContent += traverseDom(node.children);
                }
                newContent += logValue(node, 1);
            }
        }
    }
    else if (isObject(nodes)) {
        if (!isTagBlackList(nodes)) {
            newContent += logValue(nodes, 0);
            if (nodes && nodes.children && nodes.children.length) {
                newContent += traverseDom(nodes.children);
            }
            newContent += logValue(nodes, 1);
        }
    }
    else {
        console.log('yup', logValue(nodes));
        newContent += logValue(nodes);
    }
    return newContent;
}
function ng2string(nodes) {
    var serialized = traverseDom(nodes);
    return serialized;
}
exports.ng2string = ng2string;
;
