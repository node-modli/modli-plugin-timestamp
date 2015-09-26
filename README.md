[![wercker status](https://app.wercker.com/status/bb95222575a57e1eb150e52ce9ae7d7a/s/master "wercker status")](https://app.wercker.com/project/bykey/bb95222575a57e1eb150e52ce9ae7d7a)
[![Code Climate](https://codeclimate.com/github/node-modli/modli-plugin-timestamp/badges/gpa.svg)](https://codeclimate.com/github/node-modli/modli-plugin-timestamp)
[![Test Coverage](https://codeclimate.com/github/node-modli/modli-plugin-timestamp/badges/coverage.svg)](https://codeclimate.com/github/node-modli/modli-plugin-timestamp/coverage)

# Modli - Timestamp Plugin

This module provides auto-generation functionality for specificly formatted 
timestamps based on the CRUD operation assigned.

## Installation

```
npm install modli-plugin-timestamp --save
```

## Usage

This module extends Modli functionality by appending on the configuration to the 
model object.

```javascript
import { model, adapter, Joi, use } from 'modli';
import nedb from 'modli-nedb';

// IMPORTANT: Include the timestamp module
import timestamp from 'modli-plugin-timestamp';

// Create a model
model.add({
  name: 'testModel',
  version: 1,
  schema: {
    content: Joi.string(),
    created: Joi.date().format('MM/DD/YYYY'),
    modified: Joi.date().format('MM/DD/YYYY')
  },
  // IMPORTANT: Extends on the model by adding a 'timestamp' object
  timestamp: {
    // The 'created' property will be assigned when 'create' is called
    created: [ 'create' ],
    // The 'modified' property will be assigned when 'create' or 'update' are called
    modified: [ 'create', 'update' ]
  }
});

// Add adapter using NeDB
adapter.add({
  name: 'testNEDB',
  source: nedb,
  config: {
    inMemoryOnly: true
  }
});

const testModli = use('testModel', 'testNEDB');

// IMPORTANT: Apply the plugin to the instance
testModli.plugin(timestamp);
```

## Makefile and Scripts

A `Makefile` is included for managing build and install tasks. The commands are
then referenced in the `package.json` `scripts` if that is the preferred
task method:

* `all` (default) will run all build tasks
* `start` will run the main script
* `clean` will remove the `/node_modules` directories
* `build` will transpile ES2015 code in `/src` to `/build`
* `test` will run all spec files in `/test/src`
* `test-cover` will run code coverage on all tests
* `lint` will lint all files in `/src`

## Testing

Running `make test` will run the full test suite. Since adapters require a data
source if one is not configured the tests will fail. To counter this tests are
able to be broken up.

**Test Inidividual File**

An individual spec can be run by specifying the `FILE`. This is convenient when
working on an individual adapter.

```
make test FILE=some.spec.js
```

The `FILE` is relative to the `test/src/` directory.

**Deploys**

For deploying releases, the `deploy TAG={VERSION}` can be used where `VERSION` can be:

```
<newversion> | major | minor | patch | premajor
```

Both `make {COMMAND}` and `npm run {COMMAND}` work for any of the above commands.

## License

Modli-Timestamp is licensed under the MIT license. Please see `LICENSE.txt` for full details.

## Credits

Modli-Timestamp was designed and created at [TechnologyAdvice](http://www.technologyadvice.com).