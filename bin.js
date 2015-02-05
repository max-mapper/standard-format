#!/usr/bin/env node

var fmt = require('./')
var fs = require('fs')
var stdin = require('stdin')
var argv = require('minimist')(process.argv.slice(2), {
  boolean: 'write',
  alias: {
    w: 'write'
  }
})

function processFile (transformed) {
  if (argv.write && transformed.name !== 'stdin') {
    fs.writeFileSync(transformed.name, transformed.data)
  } else {
    console.log(transformed.data)
  }
}

function getFiles (done) {
  var args = argv._
  if (!process.stdin.isTTY) {
    return stdin(function (file) {
      return done(null, [{ name: 'stdin', data: file }])
    })
  } else if (args.length === 0) {
    return fmt.load(done)
  } else {
    return done(null, args.map(function (file) {
      return { name: file, data: fs.readFileSync(file).toString() }
    }))
  }
}

getFiles(function (err, files) {
  if (err) return error(err)
  files.forEach(function (file) {
    file.data = fmt.transform(file.data)
    processFile(file)
  });
})

function error (err) {
  console.error(err)
  process.exit(1)
}
