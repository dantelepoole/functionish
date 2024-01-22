/**
 * @module math/ispositiveorzero
 */

'use strict';

/**
 * Return `true` if *number* is greater than or equal to `0`. Otherwise, return `false`.
 *
 * This function does not verify the argument type, so its behaviour is unpredictable if passed anything other than a
 * number type.
 * 
 * @example <caption>Example usage of `ispositiveorzero()`</caption>
 * 
 * const { ispositiveorzero } = require('functionish/math');
 * 
 * ispositiveorzero(42); // returns true
 * ispositiveorzero(-42); // returns false
 * ispositiveorzero(0); // returns true
 * 
 * @function ispositiveorzero
 * @param {number} a The number to check
 * @returns {boolean}
 */
function ispositiveorzero(number) {
    return (number >= 0);
}

module.exports = ispositiveorzero;