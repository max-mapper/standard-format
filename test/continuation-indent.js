var test = require('tape')
var fmt = require('../').transform

var continuation_indent = [
  {
    program: ['function x()',
      '{',
      '  var i=0;',
      '  do {',
      '    i++',
      '  } while(i<10)',
      '  console.log(i);',
      '}'].join('\n'),
    expected: ['function x () {',
      '  var i = 0',
      '  do {',
      '    i++',
      '  } while (i < 10)',
      '  console.log(i)',
      '}', ''].join('\n'),
    msg: 'do-while'
  }
]

test('Continuation Indent', function (t) {
  t.plan(continuation_indent.length)
  continuation_indent.forEach(function (obj) {
    t.equal(fmt(obj.program), obj.expected, obj.msg)
  })
})
