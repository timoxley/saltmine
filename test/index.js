"use strict"

var test = require("tape")

var saltmine = require('../')
var multiline = require('multiline')
var almostEqual = require('almost-equal')

function almost(a, b) {
  return almostEqual(
    a, b,
    almostEqual.FLT_EPSILON,
    almostEqual.FLT_EPSILON
  )
}

test('single parameter, small data, simple operation', function(t) {
  var input = [1,2,3]
  var output = saltmine(input, multiline(function(){/*
    return a * 2.0; // double number
  */}))
  t.ok(output, 'received response')
  output.forEach(function(num, index) {
    var expected = input[index] * 2
    t.ok(almost(num, expected), num + ' almost equal ' + expected)
  })
  t.end()
})

test('2 parameters, small data, simple operation', function(t) {
  var a = [1,2,3]
  var b = [1,2,3]
  var output = saltmine(a, b, multiline(function(){/*
    return a * b; // multiply numbers
  */}))
  t.ok(output, 'received response')
  output.forEach(function(num, index) {
    var expected = a[index] * b[index]
    t.ok(almost(num, expected), num + ' almost equal ' + expected)
  })
  t.end()
})

test('3 parameters, small data, simple operation', function(t) {
  var a = [1,2,3]
  var b = [1,2,3]
  var c = [1,2,3]
  var output = saltmine(a, b, c, multiline(function(){/*
    return a * b * c; // multiply numbers
  */}))
  t.ok(output, 'received response')
  output.forEach(function(num, index) {
    var expected = a[index] * b[index] * c[index]
    t.ok(almost(num, expected), num + ' almost equal ' + expected)
  })
  t.end()
})

test('4 parameters, small data, simple operation', function(t) {
  var a = [1,2,3]
  var b = [1,2,3]
  var c = [1,2,3]
  var d = [1,2,3]
  var output = saltmine(a, b, c, d, multiline(function(){/*
    return a * b * c * d; // multiply numbers
  */}))
  t.ok(output, 'received response')
  output.forEach(function(num, index) {
    var expected = a[index] * b[index] * c[index] * d[index]
    t.ok(almost(num, expected), num + ' almost equal ' + expected)
  })
  t.end()
})

test('zero', function(t) {
  var input = [1,2,3]
  var output = saltmine(input, multiline(function(){/*
    return 0.0; // double number
  */}))
  t.ok(output, 'received response')
  t.deepEqual(output, [0,0,0])
  t.end()
})


