import assert from 'assert';
import app from '../../src/app';

describe('\'topics\' service', () => {
  it('registered the service', () => {
    const service = app.service('topics');

    assert.ok(service, 'Registered the service');
  });
});
