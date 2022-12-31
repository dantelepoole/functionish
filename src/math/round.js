/**
 * @module math/round
 */

'use strict';

/**
 * Round the value of *value* to the nearest integer.
 * 
 * This funciton is an alias for {@link external:Math.round Math.round}.
 * 
 * @example
 * const round = require('functionish/math/round');
 * 
 * round(42.3); // returns 42
 * round(41.7); // returns 42
 * round(41.5); // returns 45
 * 
 * @function round
 * @see {@link external:Math.round Math.round}
 * @param {number} value The value to round to the nearest integer.
 * @returns {number}
 */
module.exports = Math.round;