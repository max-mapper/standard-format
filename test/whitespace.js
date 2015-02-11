
var test = require('tape')
var fmt = require('../').transform

test('sol whitespace', function (t) {
  t.plan(2)

  var program  = '   [1,2,3].map'
  var expected = '   ;[1,2,3].map'
  var msg = 'first line sol whitespace is preserved during semicolon insertion'
  t.equal(fmt(program), expected, msg)

  program  = '\n\t\t[1,2,3].map'
  expected = '\n\t\t;[1,2,3].map'
  msg = 'newline sol tabs are preserved during semicolon insertion'
  t.equal(fmt(program), expected, msg)
})
