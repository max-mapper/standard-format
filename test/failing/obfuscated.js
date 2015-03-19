var test = require('tape')
var fmt = require('../../').transform
var run = require('../standard-runner')
var fs = require('fs')
var path = require('path')
var standard = require('standard')

var files = [
  { path: path.resolve(path.join(__dirname, '/obfuscated-files/standard-format-torture.js'))}
]

test('obfuscated files', function (t) {
  files.forEach(function (obj) {
    fs.readFile(obj.path, function (err, data) {
      t.error(err, 'no errors opening the file')
      var formatted = fmt(data.toString())
      var lines = formatted.split('\n')
      t.ok(formatted, 'formatting returned results')
      run(formatted, function (err, reports) {
        t.ok(!err, 'no runner errors')
        reports.forEach(function (report) {
          var highlight = run.highlight(lines, report)
          t.fail(report.message)
          var comment = '\n' +
          report.source + ':' +
          report.line + ':' +
          report.column + ':' +
          report.message + highlight
          console.log(comment)
        })
        t.end()
      })
    })
  })
})
