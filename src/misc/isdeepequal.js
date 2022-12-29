/**
 * @module misc/isdeepequal
 */

'use strict';

/**
 * Alias for the `isDeepStrictEqual()` method of Node's `util` package.
 * 
 * @func isdeepequal
 * @param {any} a The value to compare
 * @param {any} b The value to compare against
 * @returns {boolean}
 */
module.exports = require('util').isDeepStrictEqual;
