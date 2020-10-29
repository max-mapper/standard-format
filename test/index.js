const test = require('tape')
const join = require('path').join
const testFile = require('./testFile')
const TARGET_FILE = join(__dirname, './test-files/test.js')

test('test.js formatted and linted without error', testFile(TARGET_FILE))
