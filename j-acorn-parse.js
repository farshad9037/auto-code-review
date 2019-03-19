//Convert JS file string to JavaScript AST
var acorn = require('acorn');
function acornParse(source) {
    return acorn.parse(source, {
        allowReturnOutsideFunction: true,
        allowImportExportEverywhere: true,
        allowHashBang: true,
        ecmaVersion: 5,
        locations: true
    });
};
module.exports = acornParse;