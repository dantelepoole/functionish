/**
 * @module math/power
 */

'use strict';

const curry = require('../curry');

/**
 * [to do]
 * 
 * @example
 * const power = require('functionish/math/power');
 * 
 * power(2, 3); // returns 9
 * power(3, 2); // returns 8;
 * 
 * @function power
 * @param {number} exponent The exponent to raise *base* to the power of
 * @param {number} base The value to raise to the power of *exponent*
 * @returns {number}
 */
function power(exponent, base) {
    return Math.pow(base, exponent);
}

module.exports = curry(1, power);