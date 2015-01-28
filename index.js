var path = require('path')
var os = require('os')
var fs = require('fs')
var glob = require('glob')
var findRoot = require('find-root')
var Minimatch = require('minimatch').Minimatch

var DEFAULT_IGNORE = [
  'node_modules/**',
  '.git/**',
  '**/*.min.js',
  '**/bundle.js'
]

module.exports.transform = function (files) {
  var NAMED_FUNCTION_NOSPACE = /function(\s+)?(\w+)(\s+)?\(/ig
  var ANON_FUNCTION_NOSPACE = /function(\s+)?\(/ig
  var NAMED_FUNCTION_SPACE = 'function $2 ('
  var ANON_FUNCTION_SPACE = 'function ('
  var FUNCTION_DECLARATION = /function\s(\w+)\s\((.+)?\)(\s+)?\{/ig
  var ANON_FUNCTION_DECLARATION = /function\s\((.+)?\)(\s+)?\{/ig
  var CLEAN_FUNCTION_DECLARATION = 'function $1 ($2) {'
  var CLEAN_ANON_FUNCTION_DECLARATION = 'function ($1) {'
  var MULTI_NEWLINE = /(\r?\n)(\r?\n)/g
  var EOL = os.EOL
  
  files = files.map(function(f) {
    return f
      .replace(NAMED_FUNCTION_NOSPACE, NAMED_FUNCTION_SPACE)
      .replace(ANON_FUNCTION_NOSPACE, ANON_FUNCTION_SPACE)
      .replace(FUNCTION_DECLARATION, CLEAN_FUNCTION_DECLARATION)
      .replace(ANON_FUNCTION_DECLARATION, CLEAN_ANON_FUNCTION_DECLARATION)
      .replace(MULTI_NEWLINE, EOL)
  })

  return files
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
      return fs.readFileSync(f).toString() // assume utf8
    })
    cb(null, files)
  })
}
