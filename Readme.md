# saltmine

Arbitrary computation on the GPU using WebGL.

Very experimental.

## Installation

## Usage

```js
var saltmine = require('saltmine')
var multiline = require('multiline')

var input = [1,2,3]

var output = saltmine(input, multiline(function(){/*
  return a * 2.0; # double number
*/}))

// Result (Note float precision):
// [
//   2.0000001899999997,
//   4.0000003799999995,
//   6.00000044838664
// ]
```

## Credit

Massive thanks to the talented [@hughsk](https://github.com/hughsk) for pairing with me
on this. Saved me from many wrong turns.

## License

MIT
