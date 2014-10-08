"use strict"

var fs = require('fs')
var slice = require('sliced')
var createShader = require('gl-shader')
var createContext = require('gl-context')
var ndarray = require('ndarray')
var display = require('gl-texture2d-display')
var createTexture = require("gl-texture2d")
var unpackFloat = require("glsl-read-float")

var draw = require('a-big-triangle')
var canvasPixels = require('canvas-pixels')

var fragSource = fs.readFileSync(__dirname + '/index.frag', 'utf8')
var vertSource = fs.readFileSync(__dirname + '/index.vert', 'utf8')

module.exports = function (a, b, c, d, operation) {
  var args = slice(arguments)
  return SaltMine(args.slice(0, -1), args.pop())
}

var size = 2048

function SaltMine(datasets, operation) {

  //var size = Math.ceil(datasets[0].length / 2)

  // setup canvas
  var canvas = document.createElement('canvas')
  canvas.height = size
  canvas.width = size

  // setup gl context
  var gl = createContext(canvas)

  gl.disable(gl.DEPTH_TEST)
  gl.disable(gl.CULL_FACE)

  enableFloatTextures(gl)

  // add body to fragment shader operation
  var updatedFragSource = replaceOperation(datasets, operation)

  var shader = createShader(gl, vertSource, updatedFragSource)
  var texture = createTexture(gl, size, size, gl.RGBA, gl.FLOAT)

  var buffer = new Float32Array(size * size * 4)

  for (var i = 0, l = datasets.length; i < l; i ++) {
    var data = datasets[i];
    loadChannel(buffer, data, i)
  }

  // load
  texture.setPixels(ndarray(buffer, [size, size, 4]))

  // bind
  gl.viewport(0, 0, size, size)
  shader.bind()
  shader.uniforms.uInput = texture.bind()

  draw(gl)

  var pixels = canvasPixels(gl)
  var template = datasets[0]
  // output same datatype as input
  var output = new (template.constructor)(template.length)

  // copy to result
  for (var i = 0, l = template.length * 4; i < l; i += 4) {
    var r = pixels[i + 0]
    var g = pixels[i + 1]
    var b = pixels[i + 2]
    var a = pixels[i + 3]
    var result = unpackFloat(r, g, b, a)
    output[i / 4] = result || 0
  }

  return output
}

function loadChannel(buffer, data, channel) {
  for (var i = 0, l = data.length; i < l; i ++) {
    var v = data[i]
    var r = i * 4
    buffer[r + channel] = v
  }
}

function enableFloatTextures(gl) {
  if (!gl.getExtension('OES_texture_float')) {
    throw new Error('no floating point texture support');
  }
}

function replaceOperation(datasets, operation) {
  var arity = datasets.length
  var keys = 'abcd'
  var args = keys.split('').slice(0, arity).join(', ')
  return fragSource
  .replace('return '+keys[arity - 1]+'; // REPLACE', operation) // function body
  .replace('operation()', 'operation('+args+')') // function call
}
