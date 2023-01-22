/**
 * @module misc/notdeepequal
 */

'use strict';

const curry2 = require('../curry2');
const isdeepequal = require('./isdeepequal');

/**
 * Return `true` if the arguments are not deep (strictly) equal. Otherwise, return `false.
 * 
 * Uses the `isDeepStrictEqual()` method of Node's `util` package for the comparison.
 * 
 * `notdeepequal()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `notdeepequal()`</caption>
 * 
 * const { notdeepequal } = require('functionish/misc');
 * 
 * notdeepequal( [1,2,3], [1,2,] );  // returns true
 * notdeepequal( [1,2,3], [1,2,3] ); // returns false
 * 
 * @function notdeepequal
 * @see {@link module:misc/isdeepequal isdeepequal()}
 * @param {any} a The value to compare
 * @param {any} b The value to compare against
 * @returns {boolean}
 */
function notdeepequal(a,b) {
    return ! isdeepequal(a, b);
}

module.exports = curry2(notdeepequal);