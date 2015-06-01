var path = require('path')
var fs = require('fs')
var os = require('os')
var glob = require('glob')
var findRoot = require('find-root')
var Minimatch = require('minimatch').Minimatch
var formatter = require('esformatter')

var ESFORMATTER_CONFIG = require(path.join(__dirname, 'rc', 'esformatter.json'))
var DEFAULT_IGNORE = [
  'node_modules/**',
  '.git/**',
  '**/*.min.js',
  '**/bundle.js'
]

var MULTI_NEWLINE = /((?:\r?\n){3,})/g
var EOL_SEMICOLON = /;\r?\n/g
var EOL_SEMICOLON_WITH_COMMENT = /;(?=\s*\/\/[\s\w]*\r?\n)/g
var SOF_NEWLINES = /^(\r?\n)+/g
var EOL = os.EOL

module.exports.transform = function (file) {
  file = file
    .replace(MULTI_NEWLINE, EOL + EOL)

  var prefix = 'function fixReturns() {\n'
  var postfix = '\n}'

  file = prefix + file + postfix

  var formatted = formatter.format(file, ESFORMATTER_CONFIG)
    .replace(EOL_SEMICOLON, EOL)
    .replace(EOL_SEMICOLON_WITH_COMMENT, '')
    .replace(SOF_NEWLINES, '').slice(prefix.length, -postfix.length)
    .split('\n').map(removeIndent).join('\n')

  return formatted

  function removeIndent(line) {
    return line.slice(2)
  }
}

module.exports.load = function (opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  if (!opts) opts = {}

  var root
  try {
    root = findRoot(process.cwd())
  } catch (e) {}

  var ignore = [].concat(DEFAULT_IGNORE) // globs to ignore

  if (root) {
    var packageOpts = require(path.join(root, 'package.json')).standard
    if (packageOpts) ignore = ignore.concat(packageOpts.ignore)
  }

  if (opts.ignore) ignore = ignore.concat(opts.ignore)

  ignore = ignore.map(function (pattern) {
    return new Minimatch(pattern)
  })

  glob('**/*.js', {
    cwd: opts.cwd || process.cwd()
  }, function (err, files) {
    if (err) return cb(err)
    files = files.filter(function (file) {
      return !ignore.some(function (mm) {
        return mm.match(file)
      })
    }).map(function (f) {
      return { name: f, data: fs.readFileSync(f).toString() } // assume utf8
    })
    cb(null, files)
  })
}
