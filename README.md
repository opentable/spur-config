<img src="https://opentable.github.io/spur/logos/Spur-Config.png?rand=1" width="100%" alt="Spur: Config" />

Configuration framework to help manage complex application configurations in [Node.js](http://nodejs.org/).

[![NPM version](https://badge.fury.io/js/spur-config.png)](http://badge.fury.io/js/spur-config)
[![Build Status](https://travis-ci.org/opentable/spur-config.png?branch=master)](https://travis-ci.org/opentable/spur-config)

# About the Spur Framework

The Spur Framework is a collection of commonly used Node.JS libraries used to create common application types with shared libraries.

[Visit NPMJS.org for a full list of Spur Framework libraries](https://www.npmjs.com/browse/keyword/spur-framework) >>

# Topics

- [Quick start](#quick-start)
    - [Usage](#usage)
      - [Configuration files](#configuration-files)
      - [Standalone use](#standalone-use)
      - [With spur-ioc auto-registration](#with-spur-ioc-auto-registration)
- [Contributing](#contributing)
- [License](#license)


# Quick start

## Installing

`Standalone:`
```bash
$ npm install spur-config --save
```

`With dependency injection:`
```bash
$ npm install spur-ioc --save
$ npm install spur-common --save
$ npm install spur-config --save
```

## Usage

### Configuration files

#### `src/config/default.coffee`

```coffeescript
module.exports = ()->

  @properties {
    environment: "default"
    port: 8080
  }
```

#### `src/config/shared-deployed.coffee`

```coffeescript
module.exports = ()->

  @properties {
    shared:
      someProp: 123
  }
```

#### `src/config/development.coffee` (default)

```coffeescript
module.exports = ()->

  @extends "default"

  @properties {
    environment: "default"
  }
```

#### `src/config/production.coffee`

```coffeescript
module.exports = ()->

  # Extend multiple files
  @extends "default", "shared-deployed"

  @properties {
    environment: "production"
    port: process.env.PORT or 9000
  }
```

### `Standalone use`

This example shows how to manually load configuration into

```coffeescript
spurConfig = require "spur-config"

# load specific environment file
config = SpurConfig.load path.join(__dirname, "src/config"), "production"

# loads configuration specified in NODE_ENV environment variable
config = SpurConfig.load path.join(__dirname, "src/config")
```

### `With spur-ioc auto-registration`

This example loads the configuration into an injector/module and makes it available as the `config` dependency.

#### `src/injector.coffee`
```coffeescript
spur           = require "spur-ioc"
spurConfig     = require "spur-config"
registerConfig = require "spur-common/registerConfig"

module.exports = ()->

  ioc = spur.create("test-application")

  registerConfig(ioc, path.join(__dirname, "./config"))

  return ioc
```

#### `src/services/TestConfig.coffee`

```coffeescript
module.exports = (config)->

  console.log(config)

```

# Contributing

## We accept pull requests

Please send in pull requests and they will be reviewed in a timely manner. Please review this [generic guide to submitting a good pull requests](https://github.com/blog/1943-how-to-write-the-perfect-pull-request). The only things we ask in addition are the following:

 * Please submit small pull requests
 * Provide a good description of the changes
 * Code changes must include tests
 * Be nice to each other in comments. :innocent:

## Style guide

The majority of the settings are controlled using an [EditorConfig](.editorconfig) configuration file. To use it [please download a plugin](http://editorconfig.org/#download) for your editor of choice.

## All tests should pass

To run the test suite, first install the dependancies, then run `npm test`

```bash
$ npm install
$ npm test
```

# License

[MIT](LICENSE)
