/**
 * @module math/iseven
 */

'use strict';

/**
 * Return `true` if *value* is divisible by `2`.
 * 
 * @example
 * const iseven = require('functionish/math/iseven');
 * 
 * iseven(42); // returns true
 * iseven(1); // returns false
 * iseven(0); // returns true
 * 
 * @function iseven
 * @param {number} value The value to check
 * @returns {boolean}
 */
function iseven(value) {
    return !(+value & 1);
}

module.exports = iseven;