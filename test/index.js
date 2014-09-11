var rmrf     = require('rimraf')
var test     = require('tape')
var path     = require('path')
var district = require('../')
var fs       = require('fs')

rmrf.sync(path.join(__dirname, 'node_modules'))

test('district', function(t) {
  t.plan(0)

  var number = [1, 2, 3, 4]
  var linked = number.map(function(n) {
    return path.join(__dirname, 'module-'+n)
  })

  var dests = number.map(function(n) {
    return path.join(__dirname, 'node_modules', '@modules', 'module-'+n)
  })

  district('modules', linked, __dirname, function(err) {
    if (err) return t.fail(err.message)

    t.plan(dests.length * 2)
    dests.forEach(function(dest) {
      var file = path.join(dest, 'index.js')
      var name = path.basename(dest)
      t.ok(fs.existsSync(file), 'file is linked')
      t.ok(fs.readFileSync(file, 'utf8').indexOf(name) !== -1, 'correct file linked')
    })
  })
})
