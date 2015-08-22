var test = require('tape')
var fs = require('fs')
var join = require('path').join
var fmt = require('../').transform
var inspect = require('util').inspect
var standard = require('standard')
var TARGET_FILE = join(__dirname, '../test.js')

test('test.js formatted and linted without error', function (t) {
  t.plan()
  fs.readFile(TARGET_FILE, {encoding: 'utf8'}, function (err, data) {
    var formatted
    t.error(err, 'read test file without error')

    try {
      formatted = fmt(data)
    } catch(e) {
      t.error(e, 'format test file without error')
    }

    standard.lintText(formatted, function (err, result) {
      t.error(err, 'linting should be error free')
      t.equal(result.errorCount, 0, 'there should be no linting errors after formatting')
      t.equal(result.warningCount, 0, 'there should be no linting warnings after formatting')
      if (result.errorCount || result.warningCount !== 0) console.log(inspect(result, {depth: null}))
      t.end()
    })
  })
})
