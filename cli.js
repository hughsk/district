#!/usr/bin/env node

process.env.DEBUG = 'district'

var minimist = require('minimist')
var district = require('./')
var path     = require('path')
var fs       = require('fs')

var argv = minimist(process.argv.slice(2))
var name = argv._.shift()
var link = argv._.map(function(d) {
  return path.resolve(d)
})

if (!name) return bail('Please specify a package namespace to use.')
if (!argv._.length) return bail('Please specify at least one package to link.')

district(name, link, process.cwd(), {
  prefix: argv.prefix
}, function(err) {
  if (err) throw err
})

function bail(err) {
  console.error()
  console.error(err)
  console.error()

  fs.createReadStream(path.join(__dirname, 'usage.txt'))
    .once('close', function() { console.error() })
    .pipe(process.stderr)
}
