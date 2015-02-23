var test = require('tape')
var fmt = require('../').transform

test('singleline ', function (t) {
  t.plan(1)
  var program = 'if (!opts) opts = {}'

  var expected = 'if (!opts) opts = {}\n'

  t.equal(fmt(program), expected)
})
