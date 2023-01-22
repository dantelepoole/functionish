/**
 * @module misc/randominteger
 */

'use strict';

/**
 * Alias for the `randomInt()` method of NodeJS's `crypto` package. Return a random integer
 * `n` such that `min <= n < max`.
 * 
 * @example <caption>Example usage of `randominteger()`</caption>
 * 
 * const { randominteger } = require('functionish/misc');
 * 
 * randominteger(42);     // returns a random integer between 0 (inclusive) and 42 (exclusive)
 * randominteger(42, 50); // returns a random integer between 42 (inclusive) and 50 (exclusive)
 * 
 * @function randominteger
 * @param {number} [min=0] Start of the random range (inclusive).
 * @param {number} max End of the random range (exclusive).
 * @returns {number} 
 */
module.exports = require('crypto').randomInt;