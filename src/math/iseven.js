/**
 * @module math/iseven
 */

'use strict';

/**
 * Return `true` if *number* is divisible by `2`.
 * 
 * This function does not verify the argument type, so its behaviour is unpredictable if passed anything other than a
 * number type.
 * 
 * @example <caption>Example usage of `iseven()`</caption>
 * 
 * const { iseven } = require('functionish');
 * 
 * iseven(42); // returns true
 * iseven(1); // returns false
 * iseven(0); // returns true
 * 
 * @function iseven
 * @param {number} number The value to check
 * @returns {boolean}
 */
function iseven(number) {
    return !(+number & 1);
}

module.exports = iseven;