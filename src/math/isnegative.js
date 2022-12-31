/**
 * @module math/isnegative
 */

'use strict';

/**
 * Return `true` if *value* is less than `0`.
 * 
 * @example
 * const isnegative = require('functionish/math/isnegative');
 * 
 * isnegative(-42); // returns true;
 * isnegative(0); // returns false;
 * isnegative(-0); // returns false;
 * isnegative(1); // returns false;
 * 
 * @function ispositive
 * @param {number} value The value to check
 * @returns {boolean}
 */
module.exports = function isnegative(value) {
    return (value < 0);
}