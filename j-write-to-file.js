//Write string to a file with specified name
var fs = fs || require('fs');

function writeToFile(content, outputFileName) {
    fs.writeFile(outputFileName, content, function(err) {
        if (err) throw err;
        console.log('Report saved to ' + outputFileName);
    });
}

module.exports = writeToFile;