/**
 * @module misc/notdeepequal
 */

'use strict';

const isdeepequal = require('./isdeepequal');

/**
 * Return `true` if the are not deep strict equal. Otherwise, return `false.
 * 
 * Uses the `isDeepStrictEqual()` method of Node's `util` package for the comparison.
 * 
 * `notdeepequal()` is curried with binary arity.
 * 
 * @func notdeepequal
 * @see {@link module:isdeepequal isdeepequal()}
 * @param {any} a The value to compare
 * @param {any} b The value to compare against
 * @returns {boolean}
 */
module.exports = function notdeepequal(a,b) {
    return ! isdeepequal(a, b);
}