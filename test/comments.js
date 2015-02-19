var test = require('tape')
var fmt = require('../').transform

test('comments formatting', function (t) {
  t.plan(1)

  var program = '//bad comment\n'
  var expected = '// bad comment\n'
  var msg = 'Expect space or tab after // in comment'
  t.equal(fmt(program), expected, msg)
})
