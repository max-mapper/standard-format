var test = require('tape')
var fmt = require('../').transform

var cr = new RegExp(/\n/g)
var crlf = '\r\n'

var collapse = [
  {
    program:
    'var x = 1\n' +
    '\n' +
    '\n' +
    'var z = 2\n',

    expected:
    'var x = 1\n' +
    '\n' +
    'var z = 2\n',

    msg: 'two empty lines should collapse to one'
  },
  {
    program:
    'var x = 1\n' +
    '\n' + '\n' + '\n' + '\n' + '\n' +
    '\n' + '\n' + '\n' + '\n' + '\n' +
    'var z = 2\n',

    expected:
    'var x = 1\n' +
    '\n' +
    'var z = 2\n',

    msg: 'ten empty lines should collapse to one'
  },
  {
    program:
    'var foo = function () {\n' +
    '\n' +
    '  bar()\n' +
    '}\n',

    expected:
    'var foo = function () {\n' +
    '  bar()\n' +
    '}\n',
    msg: 'Remove padding newlines after curly braces'
  },
  {
    program:
    'var x = 123; /* Useful comment \n' +
    'that spans two lines */\n',

    expected:
    'var x = 123 /* Useful comment \n' +
    'that spans two lines */\n',

    msg: 'Remove semicolon from multiline comment'
  }
]

test('multiline collapse', function (t) {
  t.plan(collapse.length)
  collapse.forEach(function (obj) {
    t.equal(fmt(obj.program), obj.expected, obj.msg)
  })
})

test('multiline collapse CRLF', function (t) {
  t.plan(collapse.length)
  collapse.forEach(function (obj) {
    obj.program = obj.program.replace(cr, crlf)
    obj.expected = obj.expected.replace(cr, crlf)
    t.equal(fmt(obj.program), obj.expected, obj.msg)
  })
})

var noops = [
  {
    program:
    'var x = 1\n' +
    '\n' +
    'var z = 2\n',

    msg: 'single empty line should be unmodified'
  },
  {
    program:
    'function getRequests (cb) {\n' +
    '  nets({\n' +
    "    url: binUrl + '/api/v1/bins/' + bin.name + '/requests',\n" +
    '    json: true,\n' +
    '    headers: headers\n' +
    '  }, function (err, resp, body) {\n' +
    '    cb(err, resp, body)\n' +
    '  })\n' +
    '}\n',

    msg: 'Don\'t mess with function tabbing'

  },
  {
    program:
    'var obj = {\n' +
    "  'standard': {\n" +
    "    'ignore': ['test.js', '**test/failing/**']\n" +
    '  }\n' +
    '}\n',

    msg: 'allow single line object arrays'
  }
]

test('multiline noop', function (t) {
  t.plan(noops.length)
  noops.forEach(function (obj) {
    t.equal(fmt(obj.program), obj.program, obj.msg)
  })
})

test('multiline noop CRLF', function (t) {
  t.plan(noops.length)
  noops.forEach(function (obj) {
    obj.program = obj.program.replace(cr, crlf)
    t.equal(fmt(obj.program), obj.program, obj.msg)
  })
})
