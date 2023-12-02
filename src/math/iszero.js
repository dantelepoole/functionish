/**
 * @module math/iszero
 */

'use strict';

/**
 * Return `true` if *number* is strictly equal to `0` or `-0`.
 * 
 * This function does not verify the argument type. It will return `false` if passed anything other than `0` or `-0`.
 * 
 * @example <caption>Example usage of `iszero()`</caption>
 * 
 * const { iszero } = require('functionish');
 * 
 * iszero(42); // returns false
 * iszero(0); // returns true
 * 
 * @function iszero
 * @param {number} number The value to check
 * @returns {boolean}
 */
function iszero(number) {
    return (number === 0);
}

module.exports = iszero;