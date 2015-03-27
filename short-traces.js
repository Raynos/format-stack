'use strict';

var FormatStackTrace = require('trycatch/FormatStackTrace');
var formatErrorWithOptions = require('trycatch/formatError').formatError;
var minimist = require('minimist');
var path = require('path');
var process = require('process');

var nodeModules = path.sep + 'node_modules' + path.sep;
var isTest = path.sep + 'test' + path.sep;
var isTests = path.sep + 'tests' + path.sep;
var delimitter = '    ----------------------------------------';
var colors;
var colorMap = {
    'node': 'default',
    'node_modules': 'cyan',
    'test': 'green',
    'default': 'red'
};

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

module.exports = shortTraces;

function shortTraces() {
    Error.prepareStackTrace = prepareStackTrace;

    function prepareStackTrace(err, frames) {
        var stack = FormatStackTrace.call(this, err, frames);
        stack = formatErrorWithOptions(err, stack, {
            lineFormatter: defaultFormatter,
            colors: colors,
            filter: [
                path.dirname(__filename)
            ]
        });
        return stack;
    }
}

function defaultFormatter(line) {
    /*eslint max-depth: [2, 10]*/
    var type;
    var color;

    if (colors) {
        if (line.indexOf(nodeModules) >= 0) {
            type = 'node_modules';
        } else if (line.indexOf(isTest) >= 0 ||
                    line.indexOf(isTests) >= 0) {
            type = 'test';
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
