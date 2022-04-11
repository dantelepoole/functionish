/**
 * @module isdeepequal
 */

'use strict';

const isdeepequal = require('util').isDeepStrictEqual;

/**
 * Alias for the `isDeepStrictEqual()` method of Node's `util` package.
 * 
 * @func isdeepequal
 * @param {any} a The value to compare
 * @param {any} b The value to compare against
 * @returns {boolean}
 */
module.exports = require('./curry2')(isdeepequal );
