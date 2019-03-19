/**
Execute any command provided in the current path
Example usage: To execute jshint for each file

    var command = 'jshint -c ' + path.join(process.cwd(), '.jshintrc ') + filePath;
    execCommand(command);

    returns report of the result
***/

var fileList = require('./j-file-list')(),
    exec = require('child_process').exec,
    execSync = require('child_process').execSync,
    _ = require('underscore'),
    counter = 0,
    messageStr = '',
    reportStr = '';

function execSynchronously(command) {
    try {
        process.stdout.write('Executing: ' + command + '\n');
        execSync(command);
    } catch (err) {
        messageStr = messageStr + new Date().toString() + '\r\n' + err.stdout.toString();
    }
    counter++;
    if (counter === fileList.length) {
        reportStr = _.clone(messageStr);
        messageStr = '';
    }
};

function execAsynchronously(command) {
    exec(command,
        function(error, stdout, stderr) {
            if (stdout) {
                messageStr = messageStr + new Date().toString() + '\r\n' + stdout;
            }
            counter++;
            if (counter === fileList.length) {
                reportStr = _.clone(messageStr);
                messageStr = '';
            }
        });
};

function execCommand(command) {
    (process.platform === 'win32') ? execSynchronously(command): execAsynchronously(command);
    return reportStr;
};

module.exports = execCommand;