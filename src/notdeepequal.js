/**
 * @module notdeepequal
 */

'use strict';

const isdeepequal = require('util').isDeepStrictEqual;

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
module.exports = require('./curry2')(notdeepequal);

function notdeepequal(a,b) {
    return ! isdeepequal(a,b);
}