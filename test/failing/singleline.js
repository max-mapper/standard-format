var test = require('tape')
var fmt = require('../../').transform

var transforms = [
  {
    str: 'var x = {key:123,more:456}\n',
    expect: 'var x = {key: 123, more: 456}\n',
    msg: 'Space after comma in keys',
    issue: 'https://github.com/maxogden/standard-format/issues/54'
  }
]

test('singleline transforms', function (t) {
  t.plan(transforms.length)
  transforms.forEach(function (obj) {
    t.equal(fmt(obj.str), obj.expect, obj.msg)
  })
})
