const deglob = require('deglob')
const fs = require('fs')
const formatter = require('esformatter')

const ESFORMATTER_CONFIG = require('./rc/esformatter.json')
const DEFAULT_IGNORE = [
  'node_modules/**',
  '.git/**',
  '**/*.min.js',
  '**/bundle.js'
]

const MULTI_NEWLINE_N = /((?:\n){3,})/g
const MULTI_NEWLINE_RN = /((?:\r\n){3,})/g

const EOL_SEMICOLON = /;(?=\r?\n)/g
const EOL_SEMICOLON_WITH_COMMENT = /;(?=\s*\/[/*][\s\w*/]*\r?\n)/g
const SOF_NEWLINES = /^(\r?\n)+/g

module.exports.transform = function (file) {
  file = file
    .replace(MULTI_NEWLINE_N, '\n\n')
    .replace(MULTI_NEWLINE_RN, '\r\n\r\n')
    .replace(EOL_SEMICOLON, '')
    .replace(EOL_SEMICOLON_WITH_COMMENT, '')
    .replace(SOF_NEWLINES, '')

  const formatted = formatter.format(file, ESFORMATTER_CONFIG)
    .replace(EOL_SEMICOLON, '')
    // run replace again; esformatter-semicolon-first will re-add semicolon at EOL

  return formatted
}

module.exports.load = function (opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  if (!opts) opts = {}

  let ignore = [].concat(DEFAULT_IGNORE) // globs to ignore
  if (opts.ignore) ignore = ignore.concat(opts.ignore)

  const deglobOpts = {
    ignore,
    cwd: opts.cwd || process.cwd(),
    useGitIgnore: true,
    usePackageJson: true,
    configKey: 'standard'
  }

  deglob(['**/*.js', '**/*.jsx'], deglobOpts, function (err, files) {
    if (err) return cb(err)

    files = files.map(function (f) {
      return { name: f, data: fs.readFileSync(f).toString() } // assume utf8
    })
    cb(null, files)
  })
}
