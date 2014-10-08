"use strict"

var fs = require('fs')
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

module.exports = function(data, operation) {
  var size = Math.ceil(data.length / 2)

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
  var updatedFragSource = fragSource.replace('#REPLACE', operation)
  var shader = createShader(gl, vertSource, updatedFragSource)
  var buffer = new Float32Array(size * size * 4)

  // load data into red channel
  for (var i = 0, l = data.length; i < l; i ++) {
    var v = data[i]
    var r = i * 4
    buffer[r] = v
  }

  // load
  var texture = createTexture(gl, size, size, gl.RGBA, gl.FLOAT)
  texture.setPixels(ndarray(buffer, [size, size, 4]))

  // bind
  gl.viewport(0, 0, size, size)
  shader.bind()
  shader.uniforms.uInput = texture.bind()

  draw(gl)

  var pixels = canvasPixels(gl)

  // output same datatype as input
  var output = new (data.constructor)(data.length)

  // copy to result
  for (var i = 0, l = data.length * 4; i < l; i += 4) {
    var r = pixels[i + 0]
    var g = pixels[i + 1]
    var b = pixels[i + 2]
    var a = pixels[i + 3]
    output[i / 4] = unpackFloat(r, g, b, a)
  }

  return output
}

function enableFloatTextures(gl) {
  if (!gl.getExtension('OES_texture_float')) {
    throw new Error('no floating point texture support');
  }
}
