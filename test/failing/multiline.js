var test = require('tape')
var fmt = require('../../').transform

var noops = [
  {
    program:
    'var cool =\n' +
    '  a +\n' +
    '  b +\n' +
    '  c\n',

    msg: 'allow newlines after assignment operator'
  }
]

test('multiline noop', function (t) {
  t.plan(noops.length)
  noops.forEach(function (obj) {
    t.equal(fmt(obj.program), obj.program, obj.msg)
  })
})

var semicolons = [
  {
    program:
      'var x = 2\n' +
      '[1, 2, 3].map(function () {})\n' +
      '\n' +
      'var y = 8\n' +
      '(function () {\n' +
      '  bar()\n' +
      '}())\n',
    expected:
      'var x = 2\n' +
      ';[1, 2, 3].map(function () {})\n' +
      '\n' +
      'var y = 8\n' +
      ';(function () {\n' +
      '  bar()\n' +
      '}())\n',
    msg: 'Add semicolon before `[` and `(` if they are the first things on the line'
  }
]

test('multiline semicolons', function (t) {
  t.plan(semicolons.length)
  semicolons.forEach(function (obj) {
    t.equal(fmt(obj.program), obj.expected, obj.msg)
  })
})
