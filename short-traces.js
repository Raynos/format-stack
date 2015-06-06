'use strict';

var FormatStackTrace = require('trycatch/lib/FormatStackTrace');
var formatErrorWithOptions = require('trycatch/lib/formatError').formatError;
var path = require('path');

var defaultFormatter = require('./default-formatter.js');

module.exports = shortTraces;

function shortTraces() {
    Error.prepareStackTrace = prepareStackTrace;

    function prepareStackTrace(err, frames) {
        var stack = FormatStackTrace.call(this, err, frames);
        stack = formatErrorWithOptions(err, stack, {
            lineFormatter: defaultFormatter,
            colors: defaultFormatter.colors,
            filter: [
                path.dirname(__filename)
            ]
        });
        return stack;
    }
}

