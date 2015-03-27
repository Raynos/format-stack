'use strict';

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
