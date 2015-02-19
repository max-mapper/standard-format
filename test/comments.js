var test = require('tape')
var fmt = require('../').transform

test('comments formatting', function (t) {
  t.plan(2)

  var program = '//bad comment\n'
  var expected = '// bad comment\n'
  var msg = 'Expect space or tab after // in comment'
  t.equal(fmt(program), expected, msg)

  program = '// good comment\n'
  expected = '// good comment\n'
  msg = 'Expect good comments to be unchanged'
  t.equal(fmt(program), expected, msg)
})
