var test = require('tape')
var fmt = require('../').transform

var noops = [
  { str: 'if (!opts) opts = {}\n',
    msg: 'Noop on single line conditional assignment' },

  { str: 'var g = { name: f, data: fs.readFileSync(f).toString() }\n',
    msg: 'Noop on single line object assignment'
  },
  {
    str: '{foo: \'bar\'}\n',
    msg: 'Dont add padding to object braces'
  },
  { str: "var x = ['test.js', '**test/failing/**']\n",
    msg: 'Noop on singleline arrays'
  },
  { str: 'function x () {}\n',
    msg: 'Noop on named functions correctly spaced'
  },
  { str: 'window.wrapFunctionsUntil(1)\n',
    msg: 'Noop non-functions with function in the name'
  }
]

test('singleline noop expressions', function (t) {
  t.plan(noops.length)
  noops.forEach(function (obj) {
    t.equal(fmt(obj.str), obj.str, obj.msg)
  })
})

var transforms = [
  {
    str: 'var x = function() {}\n',
    expect: 'var x = function () {}\n',
    msg: 'Anonymous function spacing between keyword and arguments'
  },
  {
    str: 'var x = function (y){}\n',
    expect: 'var x = function (y) {}\n',
    msg: 'Anonymous function spacing between arguments and opening brace'
  },
  {
    str: 'function xx() {}\n',
    expect: 'function xx () {}\n',
    msg: 'Named function spacing between keyword and arguments'
  },
  {
    str: 'function xx (y){}\n',
    expect: 'function xx (y) {}\n',
    msg: 'Named function spacing between arguments and opening brace'
  },
  {
    str: 'var     hi =    1\n',
    expect: 'var hi = 1\n',
    msg: 'Squash spaces around variable value'
  },
  {
    str: 'var hi           = 1\n',
    expect: 'var hi = 1\n',
    msg: 'Space after variable name'
  },
  {
    str: 'var hi\n hi =    1\n',
    expect: 'var hi\nhi = 1\n',
    msg: 'Squash spaces around assignment operator'
  },
  {
    str: 'function foo (x,y,z) {}\n',
    expect: 'function foo (x, y, z) {}\n',
    msg: 'Space after commas in function parameters'
  },
  {
    str: '[1,2,3]\n',
    expect: '[1, 2, 3]\n',
    msg: 'Space after commas in array'
  },
  {
    str: 'var x = 1;\n',
    expect: 'var x = 1\n',
    msg: 'Remove semicolons'
  },
  {
    str: 'var x = {key:123}\n',
    expect: 'var x = {key: 123}\n',
    msg: 'Space after colon (key-spacing)'
  },
  {
    str: 'var x = {key : 123}\n',
    expect: 'var x = {key: 123}\n',
    msg: 'No Space before colon (key-spacing)'
  }
]

test('singleline transforms', function (t) {
  t.plan(transforms.length)
  transforms.forEach(function (obj) {
    t.equal(fmt(obj.str), obj.expect, obj.msg)
  })
})
