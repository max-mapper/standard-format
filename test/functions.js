var test = require('tape')
var fmt = require('../').transform

test('function formatting', function (t) {
  t.plan(4)
  var program = 'function x(y){}\n'
  var expected = 'function x (y) {}\n'
  var msg = 'Expect space around named function parentheses'
  t.equal(fmt(program), expected, msg)
  
  program = 'window.x = function(y){}\n'
  expected = 'window.x = function (y) {}\n'
  msg = 'Expect space around anonymous function parentheses'
  t.equal(fmt(program), expected, msg)

  program = 'function x () {}\n'
  expected = 'function x () {}\n'
  msg = 'Expect good functions to be unchanged'
  t.equal(fmt(program), expected, msg)
  
  program = "window.wrapFunctionsUntil(1)\n"
  expected = "window.wrapFunctionsUntil(1)\n"
  msg = 'Expect non-function-declarations to be unchanged'
  t.equal(fmt(program), expected, msg)
})
