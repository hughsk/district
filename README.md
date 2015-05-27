# district [![deprecated](http://badges.github.io/stability-badges/dist/deprecated.svg)](http://github.com/badges/stability-badges)

**District has been deprecated in favor of
[linklocal](http://github.com/timoxley/linklocal).**

District is a small tool to help you write local scoped packages for large
projects within small teams. It's like
[aperture](http://github.com/requireio/aperture), but much simpler: with
district you'll have to manage dependency installation and the like
yourself, but it's less likely to get in your way.

It *should* support Windows too, so if you run into any problems please open
an issue!

## CLI Usage

[![NPM](https://nodei.co/npm/district.png)](https://nodei.co/npm/district/)

``` bash
Usage:
  district <namespace> <packages...> {options}
```

Where `<namespace>` is the package namespace to use, and `<packages...>` is
a list of package directories to link.

For example, running the following from your project root:

``` javascript
district modules module-*
```

Should link up your local packages like so:

```
├── module-1
├── module-2
├── module-3
├── module-4
├── node_modules
│   └── @modules
│       ├── module-1 -> ../../module-1
│       ├── module-2 -> ../../module-2
│       ├── module-3 -> ../../module-3
│       └── module-4 -> ../../module-4
```

Now, you should be able to require any of these packages from anywhere else
in your app!

``` javascript
var a = require('@modules/module-1')
var b = require('@modules/module-2')
var c = require('@modules/module-3')
var d = require('@modules/module-4')
```

This is particularly useful for building applications with classic Node-style
granularity without having to spread it across multiple repositories.
Unfortunately you lose the wonders of semver, and in many cases spreading
the code across multiple repositories is *great* – so district's not a silver
bullet by any means.

Because it's forcing namespacing onto you, it should (in theory) be relatively
trivial to move the codebase over to something like
[npme](https://www.npmjs.org/enterprise) when you're ready.

If you're looking to tweak the behavior of district a little:

```
  --prefix  Remove a string prefix from each package name.
            For example:

              $ district modules module-* --prefix module

            Would yield "a" and "b" instead of "module-a"
            and "module-b"
```

## License

MIT. See [LICENSE.md](http://github.com/hughsk/district/blob/master/LICENSE.md) for details.
