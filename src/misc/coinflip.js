/**
 * @module misc/coinflip
 */

'use strict';

/**
 * Return either `true` of `false` with 50/50% probability. Pass a number between 0
 * and 1 (inclusive) to adjust the probability of returning `true`.
 * 
 * @example
 * const coinflip = require('functionish/misc/coinflip');
 * 
 * coinflip(); // returns true or false with 50/50% probability
 * 
 * coinflip(0.33); // returns true with 33% probability
 * coinflip(0); // always returns false
 * coinflip(1); // always returns true
 * 
 * @func coinflip
 * @param {number} [probability=0.5] The probability of returning `true` (0=0%, 1=100%).
 * @returns {boolean}
 */
module.exports = function coinflip(probability=0.5) {
    return (Math.random() - probability) < 0;
}