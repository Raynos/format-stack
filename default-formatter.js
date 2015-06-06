'use strict';

var minimist = require('minimist');
var path = require('path');
var process = require('process');

var nodeModules = path.sep + 'node_modules' + path.sep;
var isTest = path.sep + 'test' + path.sep;
var isTests = path.sep + 'tests' + path.sep;
var isLib = path.sep + 'lib' + path.sep;
var delimitter = '    ----------------------------------------';
var colors;
var colorMap = {
    'node': 'default',
    'lib': 'yellow',
    'node_modules': 'cyan',
    'test': 'green',
    'default': 'red'
};
var cwd = process.cwd();

(function doIt() {
    var argv = minimist(process.argv.slice(2));

    if (argv.color || process.stdout && process.stdout.isTTY) {
        // jscs:disable
        try {
            colors = require('ansi-styles');
        } catch(err) {}
        // jscs:enable
    }
}());

defaultFormatter.colors = colors;

module.exports = defaultFormatter;

function defaultFormatter(line) {
    /*eslint max-depth: [2, 10], complexity: [2, 15], max-statements: [2, 25] */
    var type;
    var color;

    if (colors) {
        if (line.indexOf(cwd) === -1 && line.indexOf(path.sep) >= 0) {
            // If file not from CWD then npm link;
            type = 'node_modules'
        } else if (line.indexOf(nodeModules) >= 0) {
            type = 'node_modules';
        } else if (line.indexOf(isTest) >= 0 ||
                    line.indexOf(isTests) >= 0) {
            type = 'test';
        } else if (line.indexOf(isLib) >= 0) {
            type = 'lib';
        } else if (line.indexOf(path.sep) >= 0) {
            type = 'default';
        } else if (line === delimitter || line.substring(0, 5) === 'Error') {
            return line;
        } else {
            type = 'node';
        }

        color = colorMap[type];
        if (color === 'none' || !Boolean(color)) {
            return null;
        }

        if (colors[color] && color !== 'default') {
            return colors[color].open + line +
                colors[color].close;
        }
    }

    return line;
}
