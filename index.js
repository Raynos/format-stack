'use strict';

var shortTraces = require('./shortTraces');
var longTraces = require('./longTraces');

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
