/*Script to find global variables and events which are not destroyed*/
'use strict';

var fs = fs || require('fs'),
    findGlobals = require('./j-find-globals').findGlobals,
    isScope = require('./j-find-globals').isScope,
    isBlockScope = require('./j-find-globals').isBlockScope,
    filterGlobals = require('./j-find-globals').filterGlobals,
    fileList = require('./j-file-list')(),
    findRootscopeLeaks = require('./j-find-rootscope-leaks'),
    findEventLeaks = require('./j-find-event-leaks'),
    writeToFile = require('./j-write-to-file'),
    messageStr = '';

fileList.forEach(function(filePath, index) {
    var src = fs.readFileSync(filePath, 'utf8');
    messageStr += findRootscopeLeaks(filePath, src);
    messageStr += findEventLeaks(filePath, src);
    messageStr += filterGlobals(findGlobals(src), filePath);
});

writeToFile(messageStr || 'No memory leak patterns found!!!', 'report.txt');