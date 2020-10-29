const test = require('tape')
const fmt = require('../').transform

test('deal with shebang line', function (t) {
  t.plan(2)

  const program = "#!/usr/bin/env node\nconsole.log('badaboom')\n"
  let formatted

  let msg = 'Expect formatter to not explode with shebang'
  t.ok(formatted = fmt(program), msg)

  msg = 'Expect program to be still have shebang'
  t.equal(formatted, program, msg)
})
