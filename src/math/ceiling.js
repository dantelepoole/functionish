/**
 * @module math/ceiling
 */

'use strict';

/**
 * Round *value* up to the smallest integer greater than or equal to *value*.
 * 
 * This function is an alias for {@link external:Math.ceil Math.ceil()}.
 * 
 * @example
 * const ceiling = require('functionish/math/ceiling');
 * 
 * ceiling(41.9); // returns 42
 * ceiling(41.1); // returns 42;
 * 
 * @function ceiling
 * @see {@link external:Math.ceil Math.ceil()}
 * @param {number} value The value to round up.
 * @returns {number}
 */
module.exports = Math.ceil;