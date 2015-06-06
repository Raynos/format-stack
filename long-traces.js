'use strict';

var trycatch;

var defaultFormatter = require('./default-formatter.js');

module.exports = longTraces;

function longTraces() {
    trycatch = require('trycatch');

    trycatch.configure({
        'long-stack-traces': true,
        format: defaultFormatter
    });
}
