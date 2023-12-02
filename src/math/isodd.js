/**
 * @module math/isodd
 */

'use strict';

/**
 * Return `true` if *value* is not divisible by `2`.
 * 
 * @example <caption>Example usage of `isodd()`</caption>
 * 
 * const { isodd } = require('functionish');
 * 
 * isodd(42); // returns false
 * isodd(1); // returns true
 * isodd(0); // returns false
 * 
 * @function isodd
 * @param {number} number The value to check
 * @returns {boolean}
 */
function isodd(number) {
    return (+number & 1);
}

module.exports = isodd;