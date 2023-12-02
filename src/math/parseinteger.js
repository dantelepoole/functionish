/**
 * @module math/parseinteger
 */

'use strict';

const flip = require('../flip');

/**
 * Parse the *stringvalue* and return an integer number with the specified *radix*.
 * This function forwards the arguments to {@link external:Number.parseInt Number.parseInt()} method.
 * 
 * `parseinteger()` is curried by default with unary arity.
 * 
 * @function parseinteger
 * @see {@link external:Number.parseInt Number.parseInt()}
 * @param {number} radix The radix (between 2 and 36)
 * @param {string} stringvalue The string to parse
 * @returns {number} The parsed integer
 */
module.exports = flip(Number.parseInt);