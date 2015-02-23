var test = require('tape')
var fmt = require('../').transform

var noops = [
  { str: 'if (!opts) opts = {}\n',
    msg: 'noop on single line conditional assignment' },

  { str: 'var g = { name: f, data: fs.readFileSync(f).toString() }\n',
    msg: 'noop on single line object assignment'
  }
]

test('singleline noop expressions', function (t) {
  t.plan(noops.length)
  noops.forEach(function (obj) {
    t.equal(fmt(obj.str), obj.str, obj.msg)
  })
})
