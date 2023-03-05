/**
 * @module math/ispositiveorzero
 */

'use strict';

/**
 * Return `true` if *value* is greater than or equal to `0`.
 * 
 * @example
 * const ispositiveorzero = require('functionish/math/ispositiveorzero');
 * 
 * ispositiveorzero(42); // returns true;
 * ispositiveorzero(0); // returns true;
 * ispositiveorzero(-0); // returns true;
 * ispositiveorzero(-1); // returns false;
 * 
 * @function ispositiveorzero
 * @param {number} value The value to check
 * @returns {boolean}
 */
function ispositive(value) {
    return (value >= 0);
}

module.exports = ispositive;