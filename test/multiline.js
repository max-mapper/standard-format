
var test = require('tape')
var fmt = require('../').transform

test('multiline ', function (t) {
  t.plan(1)

  var program = 
    "var x = 1\n" +
    "\n" +
    "\n" +
    "\n" +
    "var z = 2"

  var expected =
    "var x = 1\n" +
    "\n" +
    "var z = 2"

  var msg = 'two or more empty lines should collapse to one'
  t.equal(fmt(program), expected, msg)
})
