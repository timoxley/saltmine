"use strict"

var test = require("tape")

var saltmine = require('../')
var multiline = require('multiline')
var almostEqual = require('almost-equal')

function almost(a, b) {
  return almostEqual(
    a, b,
    almostEqual.FLT_EPSILON * 2,
    almostEqual.FLT_EPSILON * 2
  )
}

test('multiply', function(t) {
  var size = 1024*1024 
  console.time('multiply total')
  var a = []
  var b = []
  for (var i = 0; i < size; i++) {
    a.push(Math.random())
  }
  for (var i = 0; i < size; i++) {
    b.push(Math.random())
  }
  // test
  console.time('multiply: for loop')
  var expected = []
  for (var i = 0; i < size; i++) {
    expected.push(a[i] * b[i])
  }
  console.timeEnd('multiply: for loop')

  console.time('multiply: saltmine')
  var output = saltmine(a, b, multiline(function(){/*
    return a * b; // multiply numbers
  */}))
  console.timeEnd('multiply: saltmine')
  var maxErrors = 10
  var numErrors = 0
  // validate
  for (var i = 0; i < size; i++) {
    if (!almost(expected[i], output[i])) if (numErrors ++ < maxErrors--) t.fail(i + ' - ' + expected[i] + ' !~= ' + output[i])
  }
  if (numErrors) t.fail(numErrors + ' errors.')
  console.timeEnd('multiply total')
  t.end()
})

test('basicmath', function(t) {
  var size = 1024*1024 
  console.time('basicmath total')
  var a = []
  for (var i = 0; i < size; i++) {
    a.push(1)
  }
  // test
  console.time('basicmath: for loop')
  var expected = []
  for (var i = 0; i < size; i++) {
    expected.push(Math.pow(Math.sqrt(Math.sin(a[i])), Math.sqrt(Math.sin(a[i]))))
  }
  console.timeEnd('basicmath: for loop')

  console.time('basicmath: saltmine')
  var output = saltmine(a, multiline(function(){/*
    return pow(sqrt(sin(a)), sqrt(sin(a)));
  */}))
  console.timeEnd('basicmath: saltmine')
  var maxErrors = 10
  var numErrors = 0

  // validate
  for (var i = 0; i < size; i++) {
    if (!almost(expected[i], output[i])) if (numErrors ++ < maxErrors--) t.fail('a['+i+']: '+ a[i] + ' => ' + expected[i] + ' !~= ' + output[i])
  }

  if (numErrors) t.fail(numErrors + ' errors.')
  console.timeEnd('basicmath total')
  t.end()
})
