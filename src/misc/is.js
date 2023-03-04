/**
 * @module misc/is
 */

'use strict';

const curry = require('../curry');

/**
 * Alias for {@link external:Object.is Object.is()}.
 * 
 * `is()` is curried by default with unary arity.
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
const is = Object.is;

module.exports = curry(1, is);