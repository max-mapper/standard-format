var test = require('tape')
var fmt = require('../../').transform

var transforms = [
{
    str: 'var x = 123; // Useful comment\n',
    expect: 'var x = 123 // Useful comment\n',
    msg: 'Remove uneeded trailing semicolons that are followed by a comment',
    issue: 'https://github.com/maxogden/standard-format/issues/55'
  }
]


test('singleline transforms', function (t) {
  t.plan(transforms.length)
  transforms.forEach(function (obj) {
    t.equal(fmt(obj.str), obj.expect, obj.msg)
  })
})
