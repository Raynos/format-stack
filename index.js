var trycatch = require('trycatch');
trycatch.configure({
    'long-stack-traces': true,
    format: defaultFormatter
});

var _stackSize = 2;

module.exports = {
    setStackSize: function setStackSize(size) {
        _stackSize = size;
        return this;
    }
};

var path = require('path');
var nodeModules = path.sep + 'node_modules' + path.sep;
var isTest = path.sep + 'test' + path.sep;
var isTests = path.sep + 'tests' + path.sep;
var delimitter = '    ----------------------------------------';
var colors;
(function doIt() {
    if (process.stdout && process.stdout.isTTY) {
        //jscs:disable
        try {
            colors = require('ansi-styles');
        } catch(err) {}
        //jscs:enable
    }
})();
var colorMap = module.exports = {
    'node': 'default',
    'node_modules': 'cyan',
    'test': 'green',
    'default': 'red'
};


function defaultFormatter(line) {
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
        if ('none' === color || !Boolean(color)) {
            return;
        }

        if (colors[color] && color !== 'default') {
            return colors[color].open + line +
                colors[color].close;
        }
    }

    return line;
}


var oldPrepareStackTrace = Error.prepareStackTrace;

function prepareStackTrace(err, frames) {
    var stack = oldPrepareStackTrace.call(this, err, frames);

    var stackFrames = stack.split(delimitter);

    return stackFrames.slice(0, _stackSize).join(delimitter);
}
Error.prepareStackTrace = prepareStackTrace;
