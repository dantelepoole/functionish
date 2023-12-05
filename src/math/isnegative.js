/**
 * @module math/isnegative
 */

'use strict';

/**
 * Return `true` if *number* is less than `0`. Otherwise, return `false`.
 *
 * This function does not verify the argument type, so its behaviour is unpredictable if passed anything other than a
 * number type.
 * 
 * `isnegative()` is curried by default with unary arity.
 *  
 * @example <caption>Example usage of `isnegative()`</caption>
 * 
 * const { isnegative } = require('functionish/math');
 * 
 * isnegative(42); // returns false
 * isnegative(-42); // returns true
 * isnegative(0); // returns false
 * 
 * @function isnegative
 * @param {number} a The number to check
 * @returns {boolean}
 */
function isnegative(number) {
    return (number < 0);
}

module.exports = isnegative;