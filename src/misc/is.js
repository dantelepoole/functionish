/**
 * @module misc/is
 */

'use strict';

const curry2 = require('../curry2');

/**
 * Return `true` if and only if *a* is strictly equal to *b*. Otherwise, return `false`.
 * 
 * `is()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `is()`</caption>
 *     
 * const { is } = require('functionish')
 * 
 * const iszero = is(0);
 * 
 * iszero(42); // returns false
 * iszero(0);  // returns true
 * 
 * @function is
 * @see {@link module:isnot isnot()} 
 * @see {@link module:isequal isequal()} 
 * @param {any} a The value to compare with *b*
 * @param  {any} b The value to compare with *a*
 * @returns {boolean}
 */
function is(a, b) {
    return (a === b);
}

module.exports = curry2(is);