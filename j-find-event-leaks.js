/*This module search for DOM events related memory leak patterns*/
var astringParse = require('./j-astring-parse'),
    walk = require('acorn/dist/walk'),
    _ = require('underscore'),
    acornParse = require('./j-acorn-parse');

function findEventLeaks(filePath, source) {
    var messageStr = '';
    var ast = (typeof source === 'string') ? acornParse(source) : source;
    if (!(ast && typeof ast === 'object' && ast.type === 'Program')) {
        throw new TypeError('Source must be either a string of JavaScript or an acorn AST');
    }
    walk.ancestor(ast, {
        'ExpressionStatement': function(node, parents) {
            /***
            Search for DOM events which are not destroyed
            Example pattern:
                element.bind('click', function () {
                    _openMembersEpisodes(attrs.claimantidn);
                });
            ***/
            var nodeCallee = node.expression.callee,
                nodeExpArgs = node.expression.arguments || [];
            if (nodeCallee && nodeCallee.object && (nodeCallee.property.name === 'bind' || nodeCallee.property.name === 'on')) {
                if (nodeExpArgs.length && nodeExpArgs[0].value !== '$destroy') {
                    if (!isDestroyed(ast)) {
                        messageStr += '\r\n' + filePath + '\r\nThis DOM event is not destroyed\r\n';
                        messageStr += astringParse(node) + '\r\n';
                    }
                }
            }
        }
    });
    return messageStr;
};

function isDestroyed(ast) {
    /*Check whether the event destroyed or not*/
    var count = 0;
    walk.ancestor(ast, {
        'CallExpression': function(node, parents) {
            var nodeCallee = node.callee;
            if (nodeCallee && nodeCallee.object && (nodeCallee.property.name === 'unbind' || nodeCallee.property.name === 'off')) {
                count++;
            }
        },
    });
    return count;
};

module.exports = findEventLeaks;