var test = require('tape')
var run = require('./standard-runner')
var fs = require('fs')
var join = require('path').join
var fmt = require('../').transform

test('test.js ran through formatter', function (t) {
  var file = fs.readFileSync(join(__dirname, '../test.js')).toString()
  var formatted = fmt(file)
  var lines = formatted.split('\n')

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
