var test = require('tape')
var path = require('path')
var testFile = require('../testFile')

var files = [
  {path: path.resolve(path.join(__dirname, '/obfuscated-files/standard-format-torture.js'))}
]

files.forEach(function (fileObj) {
  var basename = path.basename(fileObj.path)
  test('deobfuscate and lint ' + basename, testFile(fileObj.path, 1))
})
