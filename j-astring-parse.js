// Convert JavaScript AST to JS
require('string.prototype.endswith');
require('string.prototype.repeat');
var astring = require('astring');

function astringParse(ast) {
    return astring.generate(ast, {
        indent: '    ',
        lineEnd: '\n',
    });
};
module.exports = astringParse;