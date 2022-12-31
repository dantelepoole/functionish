/**
 * @module math/floor
 */

'use strict';

/**
 * Round *value* down to the largest integer less than or equal to *value*.
 * 
 * This function is an alias for {@link external:Math.floor Math.floor()}.
 * 
 * @example
 * const floor = require('functionish/math/floor');
 * 
 * floor(42.1); // returns 42
 * floor(42.99); // returns 42;
 * 
 * @function floor
 * @see {@link external:Math.floor Math.floor()}
 * @param {number} value The value to round down.
 * @returns {number}
 */
module.exports = Math.floor;