/**
 * @module math/ispositive
 */

'use strict';

/**
 * Return `true` if *number* is greater than `0`. Otherwise, return `false`.
 *
 * This function does not verify the argument type, so its behaviour is unpredictable if passed anything other than a
 * number type.
 * 
 * `ispositive()` is curried by default with unary arity.
 *  
 * @example <caption>Example usage of `ispositive()`</caption>
 * 
 * const { ispositive } = require('functionish/math');
 * 
 * ispositive(42); // returns true
 * ispositive(-42); // returns false
 * ispositive(0); // returns false
 * 
 * @function ispositive
 * @param {number} a The number to check
 * @returns {boolean}
 */
function ispositive(number) {
    return (number > 0);
}

module.exports = ispositive;