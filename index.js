var deglob = require('deglob')
var fs = require('fs')
var formatter = require('esformatter')

var ESFORMATTER_CONFIG = require('./rc/esformatter.json')
var DEFAULT_IGNORE = [
  'node_modules/**',
  '.git/**',
  '**/*.min.js',
  '**/bundle.js'
]

var MULTI_NEWLINE_N = /((?:\n){3,})/g
var MULTI_NEWLINE_RN = /((?:\r\n){3,})/g

var EOL_SEMICOLON = /;(?=\r?\n)/g
var EOL_SEMICOLON_WITH_COMMENT = /;(?=\s*\/[/*][\s\w*/]*\r?\n)/g
var SOF_NEWLINES = /^(\r?\n)+/g

module.exports.transform = function (data) {
  var file = data.fileContent
  var name = data.name

  file = file
    .replace(MULTI_NEWLINE_N, '\n\n')
    .replace(MULTI_NEWLINE_RN, '\r\n\r\n')
    .replace(EOL_SEMICOLON, '')
    .replace(EOL_SEMICOLON_WITH_COMMENT, '')
    .replace(SOF_NEWLINES, '')

  var formatted = file

  try {
    formatted = formatter.format(file, ESFORMATTER_CONFIG)
      .replace(EOL_SEMICOLON, '')
      // run replace again; esformatter-semicolon-first will re-add semicolon at EOL
  } catch (e) {
    console.log('File: ' + name)
    console.log(e)
  }
  
  return formatted
}

module.exports.load = function (opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  if (!opts) opts = {}

  var ignore = [].concat(DEFAULT_IGNORE) // globs to ignore
  if (opts.ignore) ignore = ignore.concat(opts.ignore)

  var deglobOpts = {
    ignore: ignore,
    cwd: opts.cwd || process.cwd(),
    useGitIgnore: true,
    usePackageJson: true,
    configKey: 'standard'
  }

  deglob(['**/*.js', '**/*.jsx'], deglobOpts, function (err, files) {
    if (err) return cb(err)

    files = files.map(function (f) {
      return { name: f,
        data: {
          fileContent: fs.readFileSync(f).toString(),
          name: f
        }
      } // assume utf8
    })
    cb(null, files)
  })
}
