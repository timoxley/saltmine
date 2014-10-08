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
  return a * 2.0; // double number
*/}))

// Result (Note float precision):
// [
//   2.0000001899999997,
//   4.0000003799999995,
//   6.00000044838664
// ]
```

```js
var saltmine = require('saltmine')
var multiline = require('multiline')

var a = [1,2,3]
var b = [1,2,3]

var output = saltmine(a, b, multiline(function(){/*
  return a * b;
*/}))

// Result (Note float precision):
// [
//   1.0000000949999999,
//   4.0000003799999995,
//   9.00000042934544
// ]
```

## Caveats

* Current maximum data set is 4096 items.
* Overhead of setup/reading pixels generally makes calculations slower than just doing it on the CPU.

## TODO

* Support more datatypes. Everything is float now. Vectors and matrices possibly better candidates for parallel speedup.
* Figure out how to process more data.

## Credit

Massive thanks to the talented [@hughsk](https://github.com/hughsk) for pairing with me
on this. Saved me from many wrong turns.

## License

MIT
