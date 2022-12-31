/**
 * @module math/random
 */
'use strict';

/**
 * Return a floating-point, pseudo-random number that's greater than or equal to 0 and less than 1, with
 * approximately uniform distribution over that range.
 * 
 * @example
 * const random = require('functionish/math/random');
 * 
 * random(); // returns a pseudo-random number between 0 and 1 (exclusive)
 * 
 * This function is an lias for {@link external:Math.random Math.random()}.
 * 
 * @function random
 * @see {@link external:Math.random Math.random()}
 * @returns {number}
 */
module.exports = Math.random;