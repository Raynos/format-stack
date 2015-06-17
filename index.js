'use strict';

// Show more then 10 lines
Error.stackTraceLimit = Infinity;

var shortTraces = require('./short-traces');
var longTraces = require('./long-traces');

module.exports = {
    set: function set(opts) {
        if (opts && opts.traces) {
            if (opts.traces === 'long') {
                longTraces();
            } else if (opts.traces === 'short') {
                shortTraces();
            }
        }
    }
};
