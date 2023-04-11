/**
 * @module math/randominteger
 */
'use strict';

/**
 * Return an integer pseudo-random number that's greater than or equal to *minvalue* (default: `0`) and less than
 * *maxvalue* (default: `Infinity1), with approximately uniform distribution over that range.
 * 
 * @example
 * const random = require('functionish/math/random');
 * 
 * random(); // returns a pseudo-random number between 0 (inclusive) and Infinity (exclusive)
 * random(25, 51); // returns a pseudo-random integer between 25 (inclusive) and 51 (exclusive)
 * 
 * @function randominteger
 * @see {@link external:Math.random Math.random()}
 * @param {number} [minvalue=0] The minimum value for the returned integer (inclusive)
 * @param {number} [maxvalue=Infinity] The maximum value for the returned integer (exclusive)
 * @returns {number}
 */
function randominteger(minvalue=0, maxvalue=Infinity) {

    minvalue = Math.ceil(minvalue);
    maxvalue = Math.floor(maxvalue);

    return Math.floor(Math.random() * (maxvalue - minvalue) + minvalue); 
}

module.exports = randominteger;