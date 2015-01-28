#!/usr/bin/env node

var fmt = require('./')

fmt.load(function (err, files) {
  if (err) error(err)
  var transformed = fmt.transform(files)
  transformed.forEach(function (t) {
    console.log(t)
  })
})

function error (err) {
  console.error(err)
  process.exit(1)
}
