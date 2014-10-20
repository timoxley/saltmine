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


## Performance

The overhead of setup/reading pixels is quite high. For small amounts of calculations it's actually faster to do this on the CPU.

e.g. For a simple multiply operation on 1,048,576 (1024 * 1024) items, the CPU blows saltmine out of the water:


```
multiply: for loop (CPU): 112.860ms
multiply: saltmine (GPU): 822.415ms

```

But if we add more mathematics, saltmine eventually pays off:

```
moremath: for loop (CPU): 705.938ms
moremath: saltmine (CPU): 628.816ms
```

This is the amount of mathematics required to get a payoff:

```js
// in JS
Math.sqrt(Math.pow(Math.sqrt(Math.sin(a[i])), Math.sqrt(Math.sin(a[i]))) / Math.pow(Math.sqrt(Math.sin(a[i])), Math.sqrt(Math.sin(a[i])))) + Math.sqrt(Math.pow(Math.sqrt(Math.sin(a[i])), Math.sqrt(Math.sin(a[i]))) / Math.pow(Math.sqrt(Math.sin(a[i])), Math.sqrt(Math.sin(a[i]))))
```

```js
// Equivalent operation in GLSL
return sqrt(pow(sqrt(sin(a)), sqrt(sin(a))) / pow(sqrt(sin(a)), sqrt(sin(a)))) + sqrt(pow(sqrt(sin(a)), sqrt(sin(a))) / pow(sqrt(sin(a)), sqrt(sin(a))));
```

See the benchmarks for more information.

## TODO

* Support more datatypes. Everything is float now. Vectors and matrices possibly better candidates for parallel speedup.

## Credit

Massive thanks to the talented [@hughsk](https://github.com/hughsk) for pairing with me
on this. Saved me from many wrong turns.

## License

MIT
