const assert = require('assert');
const IsogramFinder = require('../js/review.js');

describe('Review', function () {
  it('should be able split text into lowercase array', function () {
    const arr = textToArray('hello BABE');
    assert.strictEqual(arr, ['hello', 'babe']);
  });

});
