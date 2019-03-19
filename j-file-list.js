// Walks through the directory and returns the list of all JS files
var fs = fs || require('fs');
var _ = require('underscore');
var path = path || require('path');
var excludedFiles = [];

var excludeConfig = { //Configuration to exclude specified files or folders
    '.vscode': true,
    'node_modules': true,
    'dist': true,
    'tests': true,
    'coverage': true,
    'vendor': true,
    'report.js': true,
    'Products': true,
    'gruntfile.js': true,
    'test-main.js': true,
    'memory-leak-finder.js': true,
    'angular-utils': true,
    'j-find-globals.js': true,
    'j-file-list.js': true,
    'j-find-globals.js': true,
    'j-acorn-parse.js': true,
    'j-exec-command.js': true,
    'j-astring-parse.js': true,
    'j-write-to-file.js': true,
    'missing-translate-finder.js': true,
    'j-globals.js': true,
    'jiva_app.js': true
}

for(var key in excludeConfig) {
    if (excludeConfig[key]) {
        excludedFiles.push(key);
    }
}
function walkSync(dir, filelist) {
    dir = dir || process.cwd();
    var files = fs.readdirSync(dir);
    files = files.filter( function(file) {
        return excludedFiles.indexOf(file) < 0;
    } );
    filelist = filelist || [];
    files.forEach(function(file) {
        file = path.resolve(dir, file);
        if (fs.statSync(file).isDirectory()) {
            filelist = walkSync(file, filelist);
        } else {
            filelist.push(file);
        }
    });
    filelist = _.filter(filelist, function(file) {
        return (path.extname(file)) === '.js';
    });
    return filelist;
};
module.exports = walkSync;
