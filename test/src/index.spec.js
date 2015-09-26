/* eslint no-unused-expressions: 0 */
/* global expect, request, describe, it, before, after */
import '../setup';

// Import test instance
import test from '../instance';

// Call the plugin
test.timestamp();

describe('timestamp', () => {
  it('inserts current timestamps for created and modified properties on create', (done) => {
    test.create({ content: 'foo' })
      .then((data) => {
        console.log('CREATED:',data);
      })
  });
});
