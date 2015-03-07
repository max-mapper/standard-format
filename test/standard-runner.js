var spawn = require('child_process').spawn
var once = require('once')
var split = require('split')
var skip = require('skip-stream')
var reduce = require('stream-reduce')
var debug = require('debug')('standard-runner')

function parse (line) {
  debug('parsing line %s', line)
  var matched = line.match(/\s*([^:]+):(\d+):(\d+):\s*(.*)/)
  return {
    source: matched[1],
    line: matched[2],
    column: matched[3],
    message: matched[4]
  }
}

function highlightLine (line, issue) {
  var str = '\n'
  str += line
  str += '\n'
  for (var i = 0; i <= issue.column; ++i) {
    str += i < issue.column ? ' ' : '^'
  }
  return str
}

function highlight (lines, issue) {
  return highlightLine(lines[issue.line - 1], issue)
}

function check (data, done) {
  var standard = spawn('standard')
  var finish = once(done)

  standard.on('error', finish)

  standard.stderr
  .pipe(split())
  .pipe(skip(1))
  .pipe(reduce(function (acc, line) {
    if (line) {
      acc.push(parse(line))
    }
    return acc
  }, []))
  .on('data', function (reports) {
    debug('reports %j', reports)
    finish(null, reports)
  })

  standard.stderr.on('end', function () {
    finish(null)
  })

  standard.stdin.end(data)
}

module.exports = check
module.exports.highlight = highlight
