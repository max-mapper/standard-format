var test = require('tape')
var fmt = require('../').transform

var noops = [
  { str: 'if (!opts) opts = {}\n',
    msg: 'noop on single line conditional assignment' },

  { str: 'var g = { name: f, data: fs.readFileSync(f).toString() }\n',
    msg: 'noop on single line object assignment'
  },
  {
    str: '{foo: \'bar\'}\n',
    msg: 'Dont add padding to object braces'
  },
  { str: "var x = ['test.js', '**test/failing/**']\n",
    msg: 'Noop on singleline arrays'
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
    msg: 'Anonomous function spacing between keyword and arguments'
  }
]

test('singleline transforms', function (t) {
  t.plan(transforms.length)
  transforms.forEach(function (obj) {
    t.equal(fmt(obj.str), obj.expect, obj.msg)
  })
})
