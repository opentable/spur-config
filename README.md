<img src="https://opentable.github.io/spur/logos/Spur-Config.png?rand=1" width="100%" alt="Spur: Config" />

Configuration framework to help manage complex application configurations in [Node.js](http://nodejs.org/).

  [![NPM Version][npm-version-image]][npm-url]
  [![NPM Install Size][npm-install-size-image]][npm-install-size-url]
  [![NPM Downloads][npm-downloads-image]][npm-downloads-url]

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
```shell
$ npm install spur-config --save
```

`With dependency injection:`
```shell
$ npm install spur-ioc --save
$ npm install spur-common --save
$ npm install spur-config --save
```

## Usage

Supports active Node versions in the [LTS Schedule](https://github.com/nodejs/LTS#lts-schedule). ([view current versions](.travis.yml))

### Configuration files

#### `src/config/default.js`

```javascript
module.exports = function () {

  return this.properties({
    environment: 'default',
    port: 8080
  });

}
```

#### `src/config/shared-deployed.js`

```javascript
module.exports = function () {

  return this.properties({
    shared: {
      someProp: 123
    }
  });

}
```

#### `src/config/development.js` (default)

```javascript
module.exports = function () {

  this.extends('default');

  return this.properties({
    environment: 'default'
  });

}
```

#### `src/config/production.js`

```javascript
module.exports = function () {

  // Extend multiple files
  this.extends('default', 'shared-deployed');

  return this.properties({
    environment: 'production',
    port: process.env.PORT or 9000
  });

}
```

### `Standalone use`

This example shows how to manually load configuration into

```javascript
const spurConfig = require('spur-config');

const configDirectory = path.join(__dirname, 'src/config');

// load specific environment file
const config = SpurConfig.load(configDirectory, 'production');

// loads configuration specified in NODE_ENV environment variable
const config = SpurConfig.load(configDirectory);
```

### `With spur-ioc auto-registration`

This example loads the configuration into an injector/module and makes it available as the `config` dependency.

#### `src/injector.js`
```javascript
const spur = require('spur-ioc');
const spurConfig = require('spur-config');
const registerConfig = require('spur-common/registerConfig');

module.exports = function () {

  const ioc = spur.create('test-application');
  const configDirectory = path.join(__dirname, './config');

  registerConfig(ioc, configDirectory);

  return ioc;
}
```

#### `src/services/TestConfig.js`

```javascript
module.exports = function (config) {

  console.log(config);

}
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

In addition we use **[ESLint](http://eslint.org/)** to enforce some of the JavaScript rules. To enable on your editor, please install one of the **[editor plugins](http://eslint.org/docs/user-guide/integrations#editors)**.

If your editor does not have ESLint integration, the test commands below will run them and fail your build.

## All tests should pass

Execute the following the install the dependencies, build and test with the following.

```shell
$ npm install
$ npm test
```

View the `package.json`'s `scripts` section for a list of all the other commands.

# License

[MIT](LICENSE)

[npm-downloads-image]: https://badgen.net/npm/dm/spur-config
[npm-downloads-url]: https://npmcharts.com/compare/spur-config?minimal=true
[npm-install-size-image]: https://badgen.net/packagephobia/install/spur-config
[npm-install-size-url]: https://packagephobia.com/result?p=spur-config
[npm-url]: https://npmjs.org/package/spur-config
[npm-version-image]: https://badgen.net/npm/v/spur-config
