# format-stack

Formats a stack with colors

This module must be required as the first thing before
everything else. It will format your stack trace with
colors and will also print the previous stack.

Be warned this uses `trycatch` so it will enable domains
and monkey patch everything to implement long stack
traces.

![format-stack-example](http://i.imgur.com/PBF5YwC.jpg)

## Example

```js
require("format-stack").set({
  traces: 'short' // 'long' works too, maybe.. ;)
});

// Any thrown error will now have a pretty printed stack
// trace.
```

## Installation

`npm install format-stack`

## Tests

`npm test`

## Contributors

 - Raynos

## MIT Licenced

  [build-png]: https://secure.travis-ci.org/Raynos/format-stack.png
  [build]: https://travis-ci.org/Raynos/format-stack
  [cover-png]: https://coveralls.io/repos/Raynos/format-stack/badge.png
  [cover]: https://coveralls.io/r/Raynos/format-stack
  [dep-png]: https://david-dm.org/Raynos/format-stack.png
  [dep]: https://david-dm.org/Raynos/format-stack
  [test-png]: https://ci.testling.com/Raynos/format-stack.png
  [test]: https://ci.testling.com/Raynos/format-stack
  [npm-png]: https://nodei.co/npm/format-stack.png?stars&downloads
  [npm]: https://nodei.co/npm/format-stack
