var test = require('tape')
var fmt = require('../../').transform

var noops = [
  {
    program: 'var cool =\n' +
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

var continuation_indent = [
  {
    program: [
      'function x()',
      '{',
      '  var i=0;',
      '  do {',
      '    i++',
      '  } while(i<10)',
      '  console.log(i);',
      '}'].join('\n'),
    expected: [
      'function x () {',
      '  var i = 0',
      '  do {',
      '    i++',
      '  } while (i < 10)',
      '  console.log(i)',
      '}', ''].join('\n'),
    msg: 'do-while continuation_indent',
    issues: [
      'https://github.com/maxogden/standard-format/pull/87'
    ]
  }
]

test('Continuation Indent', function (t) {
  t.plan(continuation_indent.length)
  continuation_indent.forEach(function (obj) {
    t.equal(fmt(obj.program), obj.expected, obj.msg)
  })
})
