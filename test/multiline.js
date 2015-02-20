var test = require('tape')
var fmt = require('../').transform

test('multiline ', function (t) {
  t.plan(3)

  var program =
    'var x = 1\n' +
    '\n' +
    '\n' +
    'var z = 2\n'

  var expected =
    'var x = 1\n' +
    '\n' +
    'var z = 2\n'

  var msg = 'two empty lines should collapse to one'
  t.equal(fmt(program), expected, msg)

  program =
    'var x = 1\n' +
    '\n' + '\n' + '\n' + '\n' + '\n' +
    '\n' + '\n' + '\n' + '\n' + '\n' +
    'var z = 2\n'

  msg = 'ten empty lines should collapse to one'
  t.equal(fmt(program), expected, msg)

  program =
    'var x = 1\n' +
    '\n' +
    'var z = 2\n'

  msg = 'single empty line should be unmodified'
  t.equal(fmt(program), program, msg)
})
