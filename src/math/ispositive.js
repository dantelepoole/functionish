/**
 * @module math/ispositive
 */

'use strict';

/**
 * Return `true` if *value* is greater than or equal to `0`.
 * 
 * @example
 * const ispositive = require('functionish/math/ispositive');
 * 
 * ispositive(42); // returns true;
 * ispositive(0); // returns true;
 * ispositive(-0); // returns true;
 * ispositive(-1); // returns false;
 * 
 * @function ispositive
 * @param {number} value The value to check
 * @returns {boolean}
 */
function ispositive(value) {
    return (value >= 0);
}

module.exports = ispositive;