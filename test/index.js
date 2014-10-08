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
