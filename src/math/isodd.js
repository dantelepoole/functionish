/**
 * @module math/isodd
 */

'use strict';

/**
 * Return `true` if *value* is not divisible by `2`.
 * 
 * @example
 * const isodd = require('functionish/math/isodd');
 * 
 * isodd(42); // returns false
 * isodd(1); // returns true
 * isodd(0); // returns false
 * 
 * @function isodd
 * @param {number} value The value to check
 * @returns {boolean}
 */
function isodd(value) {
    return (+value & 1);
}

module.exports = isodd;