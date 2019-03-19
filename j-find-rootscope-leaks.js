/*This module search for $rootSCope.$on related memory leak patterns*/
var astringParse = require('./j-astring-parse'),
    walk = require('acorn/dist/walk'),
    _ = require('underscore'),
    acornParse = require('./j-acorn-parse'),
    isScope = require('./j-find-globals').isScope,
    isBlockScope = require('./j-find-globals').isBlockScope;

function findRootscopeLeaks(filePath, source) {
    var messageStr = '';
    var ast = (typeof source === 'string') ? acornParse(source) : source;
    if (!(ast && typeof ast === 'object' && ast.type === 'Program')) {
        throw new TypeError('Source must be either a string of JavaScript or an acorn AST');
    }
    walk.ancestor(ast, {
        'ExpressionStatement': function(node, parents) {
            /***
            Search for $rootScope.$on custom event handlers which is not referred to a variable and is not destroyed
            Example pattern:
                $rootScope.$on('onEpisodeDeActivate', function (event, result) {
                    _updateEpisodeData(scope, params);
                });
            ***/
            if (isUndestroyedCustomEventHandler(node)) {
                messageStr += '\r\n' + filePath + '\r\nThis custom event is not destroyed\n';
                messageStr += astringParse(node) + '\r\n';
            }
        },
        'VariableDeclaration': function(node, parents) {
            var parent = null;
            for (var i = parents.length - 1; i >= 0 && parent === null; i--) {
                // Checks for scope of the variable
                if (node.kind === 'var' ? isScope(parents[i]) : isBlockScope(parents[i])) {
                    parent = parents[i];
                }
            }
            /***
            Search for $rootScope.$on custom event handlers which is referred to a variable but not destroyed
            case: Variable initialized and referred to event handler
            Example pattern:
                var _eventHandler = $rootScope.$on('onEpisodeDeActivate', function (event, result) {
                    _updateEpisodeData(scope, params);
                });
            ***/
            _.each(node.declarations, function(each) {
                if (each.init && each.init.callee && each.init.callee.object && each.init.callee.object.name === '$rootScope' && each.init.callee.property.name === '$on') {
                    if (!isDestroyed(parent, each.id.name)) {
                        messageStr += '\r\n' + filePath + '\r\n';
                        messageStr += '\'' + each.id.name + '\'' + ' is not destroyed\r\n';
                        messageStr += astringParse(node) + '\r\n';
                    }
                }
            });
        },
        'AssignmentExpression': function(node, parents) {
            /***
            Search for $rootScope.$on custom event handlers which is referred to a variable but not destroyed
            case: Variable initialized initially and referred to event handler laterlater
            Example pattern:
                var _eventHandler;
                _eventHandler = $rootScope.$on('onEpisodeDeActivate', function (event, result) {
                    _updateEpisodeData(scope, params);
                });
            ***/
            if (node.right.type === 'CallExpression' && node.right.callee && node.right.callee.object && node.right.callee.object.name === '$rootScope' && node.right.callee.property.name === '$on') {
                if (!isDestroyed(ast, node.left.name)) {
                    messageStr += '\r\n' + filePath + '\r\n';
                    messageStr += '\'' + node.left.name + '\'' + ' is not destroyed\r\n';
                    messageStr += astringParse(node) + '\r\n';
                }
            }
        }
    });
    return messageStr;
};

function isDestroyed(ast, listenerName) {
    /*Check whether the event destroyed or not*/
    var count = 0;
    walk.ancestor(ast, {
        'CallExpression': function(node, parents) {
            var nodeArgs = node.arguments;
            /***
            Increase the count when the event listener destroyed. Actually it checks whether that function called or not
            Example:
                element.$on('$destroy', function () {
                    _eventHndler();
                })
            ***/
            if (node.callee && node.callee.name === listenerName) {
                count++;
            }
            /***
            Increase the count when the event listener destroyed. Actually it checks whether the referred variable called as an identifier
            Example:
                element.$on('$destroy', _eventHndler);
            ***/
            if (nodeArgs.length > 1 && nodeArgs[1].type === 'Identifier' && nodeArgs[1].name === listenerName) {
                count++;
            }
        },
    });
    return count;
};

function isUndestroyedCustomEventHandler(node) {
    /***
    exclude
        $rootScope.$on('$destroy', _eventHandler);
    patterns
    ***/
    var nodeCallee = node.expression.callee,
        nodeExpArgs = node.expression.arguments || [];
    if (nodeCallee && nodeCallee.object && nodeCallee.object.name === '$rootScope' && nodeCallee.property.name === '$on') {
        if (nodeExpArgs.length && nodeExpArgs[0].value !== '$destroy') {
            return true;
        }
    }
};

module.exports = findRootscopeLeaks;