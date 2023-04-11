/**
 * @module math/randomnumber
 */
'use strict';

/**
 * Return a floating-point, pseudo-random number that's greater than or equal to *minvalue* (default: `0`)and less than\
 * *maxvalue* (default: `1`), with approximately uniform distribution over that range.
 * 
 * @example
 * const randomnumber = require('functionish/math/randomnumber');
 * 
 * randomnumber(); // returns a pseudo-random number between 0 (inclusive) and 1 (exclusive)
 * randomnumber(2.6, 10.7); // returns a pseudo-random number between 2.6 (inclusive) and 10.7 (exclusive)
 * 
 * @function random
 * @param {number} [minvalue=0] The minimum value for the returned number (inclusive)
 * @param {number} [maxvalue=1] The maximum value for the returned number (exclusive)
 * @see {@link external:Math.random Math.random()}
 * @returns {number}
 */
function randomnumber(minvalue=0, maxvalue=1) {
    return Math.random() * (maxvalue - minvalue) + minvalue;
}

module.exports = randomnumber;