/**
 * @module math/power
 */

'use strict';

const flip = require('../flip');

/**
 * Return the value of *base* raised to the power of *exponent*.
 * This function forwards the arguments to {@link external:Math.pow Math.pow()} method.
 * 
 * `parseinteger()` is curried by default with unary arity.
 * 
 * @function power
 * @see {@link external:Math.pow Math.pow()}
 * @param {number} exponent The exponent
 * @param {number} base The base number
 * @returns {number}
 */
module.exports = flip(Math.pow);