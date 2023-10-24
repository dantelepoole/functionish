/**
 * @module math/ispositiveorzero
 */

'use strict';

/**
 * Return `true` if *value* is greater than or equal to `0`.
 * 
 * @example
 * const ispositive = require('functionish/math/ispositiveorzero');
 * 
 * ispositive(42); // returns true;
 * ispositive(0); // returns true;
 * ispositive(-0); // returns true;
 * ispositive(-1); // returns false;
 * 
 * @function ispositiveorzero
 * @param {number} value The value to check
 * @returns {boolean}
 */
function ispositiveorzero(value) {
    return (value >= 0);
}

module.exports = ispositiveorzero;