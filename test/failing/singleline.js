var test = require('tape')
var fmt = require('../../').transform

var transforms = [
  {
    str: 'var     hi =    1\n',
    expect: 'var hi = 1\n',
    msg: 'Squash spaces around assignment operator'
  }
]

test('singleline transforms', function (t) {
  t.plan(transforms.length)
  transforms.forEach(function (obj) {
    t.equal(fmt(obj.str), obj.expect, obj.msg)
  })
})
