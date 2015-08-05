var test = require('tape')
var fmt = require('../').transform

test('allow newline after member accessor', function (t) {
  t.plan(1)

  var program = 'test[0]\ntest\n'
  var expected = 'test[0]\ntest\n'
  t.equal(fmt(program), expected)
})

test('don\'t force newline on mid-expression member accessor', function (t) {
  t.plan(1)

  var program = 'test(test[0])\n'
  var expected = 'test(test[0])\n'
  t.equal(fmt(program), expected)
})
