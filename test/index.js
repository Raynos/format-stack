var test = require('tape');

var formatStack = require('../index.js');

test('formatStack is a function', function (assert) {
    assert.equal(typeof formatStack, 'function');
    assert.end();
});
