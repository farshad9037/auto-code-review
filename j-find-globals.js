// Creates the report of all global variables in the specified file
'use strict';

var walk = require('acorn/dist/walk');
var _ = require('underscore');
var jivaGlobals = require('./j-globals');
var acornParse = require('./j-acorn-parse');

function isScope(node) {
    return node.type === 'FunctionExpression' || node.type === 'FunctionDeclaration' || node.type === 'ArrowFunctionExpression' || node.type === 'Program';
}

function isBlockScope(node) {
    return node.type === 'BlockStatement' || isScope(node);
}

function declaresArguments(node) {
    return node.type === 'FunctionExpression' || node.type === 'FunctionDeclaration';
}

function declaresThis(node) {
    return node.type === 'FunctionExpression' || node.type === 'FunctionDeclaration';
}

function filterGlobals(globalsObj, filePath) { // Exclude jiva globals which are configured in j-globals.js
    var messageStr = '';
    _.each(globalsObj, function(each) {
        for (var key in jivaGlobals) {
            if (!jivaGlobals[each.name]) {
                messageStr += '\r\n' + filePath + ' :line ' + each.lineNo + '\r\n';
                messageStr += '\'' + each.name + '\'' + ' is not defined (Global Variable)\r\n';
                return;
            }
        }
    });
    return messageStr;
};

function findGlobals(source) {
    var globals = [];
    var ast = (typeof source === 'string') ? acornParse(source) : source;
    var declareFunction = function(node) {
        var fn = node;
        fn.locals = fn.locals || {};
        node.params.forEach(function(node) {
            declarePattern(node, fn);
        });
        if (node.id) {
            fn.locals[node.id.name] = true;
        }
    }
    var declarePattern = function(node, parent) {
        switch (node.type) {
            case 'Identifier':
                parent.locals[node.name] = true;
                break;
            case 'ObjectPattern':
                node.properties.forEach(function(node) {
                    declarePattern(node.value, parent);
                });
                break;
            case 'ArrayPattern':
                node.elements.forEach(function(node) {
                    if (node) declarePattern(node, parent);
                });
                break;
            case 'RestElement':
                declarePattern(node.argument, parent);
                break;
            case 'AssignmentPattern':
                declarePattern(node.left, parent);
                break;
            default:
                throw new Error('Unrecognized pattern type: ' + node.type);
        }
    }
    var declareModuleSpecifier = function(node, parents) {
        ast.locals = ast.locals || {};
        ast.locals[node.local.name] = true;
    }
    walk.ancestor(ast, {
        'VariableDeclaration': function(node, parents) {
            var parent = null;
            for (var i = parents.length - 1; i >= 0 && parent === null; i--) {
                if (node.kind === 'var' ? isScope(parents[i]) : isBlockScope(parents[i])) {
                    parent = parents[i];
                }
            }
            parent.locals = parent.locals || {};
            node.declarations.forEach(function(declaration) {
                declarePattern(declaration.id, parent);
            });
        },
        'FunctionDeclaration': function(node, parents) {
            var parent = null;
            for (var i = parents.length - 2; i >= 0 && parent === null; i--) {
                if (isScope(parents[i])) {
                    parent = parents[i];
                }
            }
            parent.locals = parent.locals || {};
            parent.locals[node.id.name] = true;
            declareFunction(node);
        },
        'Function': declareFunction,
        'ClassDeclaration': function(node, parents) {
            var parent = null;
            for (var i = parents.length - 2; i >= 0 && parent === null; i--) {
                if (isScope(parents[i])) {
                    parent = parents[i];
                }
            }
            parent.locals = parent.locals || {};
            parent.locals[node.id.name] = true;
        },
        'TryStatement': function(node) {
            if (node.handler === null) return;
            node.handler.locals = node.handler.locals || {};
            node.handler.locals[node.handler.param.name] = true;
        },
        'ImportDefaultSpecifier': declareModuleSpecifier,
        'ImportSpecifier': declareModuleSpecifier,
        'ImportNamespaceSpecifier': declareModuleSpecifier
    });

    function identifier(node, parents) {
        var name = node.name;
        if (name === 'undefined') return;
        for (var i = 0; i < parents.length; i++) {
            if (name === 'arguments' && declaresArguments(parents[i])) {
                return;
            }
            if (parents[i].locals && name in parents[i].locals) {
                return;
            }
        }
        node.parents = parents;
        globals.push(node);
    }
    walk.ancestor(ast, {
        'VariablePattern': identifier,
        'Identifier': identifier,
        'ThisExpression': function(node, parents) {
            for (var i = 0; i < parents.length; i++) {
                if (declaresThis(parents[i])) {
                    return;
                }
            }
            node.parents = parents;
            globals.push(node);
        }
    });
    var groupedGlobals = {};
    globals.forEach(function(node) {
        var name = node.type === 'ThisExpression' ? 'this' : node.name;
        groupedGlobals[name] = (groupedGlobals[name] || []);
        groupedGlobals[name].push(node);
    });
    return Object.keys(groupedGlobals).sort().map(function(name) {
        return {
            name: name,
            nodes: groupedGlobals[name],
            lineNo: groupedGlobals[name][0].loc.start.line
        };
    });
}
exports.findGlobals = findGlobals;
exports.isScope = isScope;
exports.isBlockScope = isBlockScope;
exports.filterGlobals = filterGlobals;
