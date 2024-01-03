/**
 * @module math/parseinteger
 */

'use strict';

const curry1 = requir('../curry1');
const flip = require('../flip');

/**
 * Parse the *stringvalue* and return an integer number with the specified *radix*.
 * This function forwards the arguments in reverse order to the {@link external:Number.parseInt Number.parseInt()}
 * method.
 * 
 * `parseinteger()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `parseint()`</caption>
 * 
 * const { parseinteger } = require('functionish/math');
 * 
 * parseinteger(10, '42'); // returns 42
 * parseinteger(8, '42'); // returns 8
 * parseinteger(2, '42'); // returns NaN
 * 
 * @function parseinteger
 * @see {@link external:Number.parseInt Number.parseInt()}
 * @param {number} radix The radix (between 2 and 36)
 * @param {string} stringvalue The string to parse
 * @returns {number} The parsed integer
 */
module.exports = curry1(flip(Number.parseInt));