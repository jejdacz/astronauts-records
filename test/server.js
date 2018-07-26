import http from 'http';
import { expect, should, assert } from 'chai';

describe('Example Node Server', () => {
  it('should return 200', done => {
    http.get('http://localhost:4000', res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});
