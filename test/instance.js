import { model, adapter, Joi, use } from 'modli';
import nedb from 'modli-nedb';

// IMPORTANT: Include the timestamp module
import timestamp from './../src/index';

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

export default testModli;