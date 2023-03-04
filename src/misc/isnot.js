/**
 * @module misc/isnot
 */

'use strict';

const curry = require('../curry');

/**
 * Return `true` if and only if *a* is not strictly equal to *b*. Otherwise, return `false`.
 * 
 * `isnot()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `isnot()`</caption>
 *     
 * const { isnot } = require('functionish')
 * 
 * const isnotzero = isnot(0);
 * 
 * isnotzero(42); // returns true
 * isnotzero(0);  // returns false
 * 
 * @function isnot
 * @see {@link module:misc/is is()}
 * @see {@link module:misc/notequal notequal()} 
 * @param {any} a The value to compare with *b*
 * @param  {any} b The value to compare with *a*
 * @returns {boolean}
 */
function isnot(a, b) {
    return (a !== b);
}

module.exports = curry(1, isnot);