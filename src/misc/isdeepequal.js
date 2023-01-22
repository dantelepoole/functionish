/**
 * @module misc/isdeepequal
 */

'use strict';

/**
 * Alias for the `isDeepStrictEqual()` method of Node's `util` package.
 * 
 * `isdeepequal()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `isdeepequal()`</caption>
 * 
 * const { isdeepequal } = require('functionish/misc');
 * 
 * isdeepequal( [1,2,3], [1,2,3] ); // returns true
 * isdeepequal( [1,2,3], [1,2,] );  // returns false
 * 
 * @function isdeepequal
 * @see {@link module:misc/notdeepequal notdeepequal()}
 * @param {any} a The value to compare
 * @param {any} b The value to compare against
 * @returns {boolean}
 */
module.exports = require('util').isDeepStrictEqual;
